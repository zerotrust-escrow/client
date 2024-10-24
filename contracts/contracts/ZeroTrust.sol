// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ZeroTrust {
    address owner;
    IERC20 usdt;
    uint256 transactionCount;
    uint256 TRANSACTION_FEE;
    uint256 totalFees;

    // Custom errors
    error ItemPriceTooLow();
    error InvalidRole();
    error AddressZeroDetected();
    error InvalidTransactionId();
    error UnAuthorised();
    error TransactionAlreadyAccepted();
    error TransactionAlreadyCancelled();
    error InsufficientFunds();
    error IndufficientAllowance();
    error TransactionAlreadyClosed();

    // Transaction status enumeration
    enum TransactionStatus {
        PENDING,
        ACCEPTED,
        CANCELLED,
        COMPLETED
    }

    // Transaction structure
    struct Transaction {
        string transactionTitle;
        string itemName;
        uint256 amount;
        uint256 inspectionPeriod;
        string itemDescription;
        string itemCategory;
        string initiatorRole;
        address buyer;
        address seller;
        TransactionStatus transactionStatus; //pending, accepted, completed
        bool feePaid;
        bool settled;
        address initiator;
        bool cancelled;
    }

    // Transaction history structure
    struct TransactionHistory {
        uint256 createdAt;
        uint256 transactionId;
        string description;
    }

    constructor(IERC20 _usdtAddress, uint256 _transactionFee) {
        usdt = _usdtAddress;
        owner = msg.sender;
        TRANSACTION_FEE = _transactionFee;
    }

    mapping(uint256 => Transaction) transactions; // Mapping of transaction ID to Transaction
    mapping(uint256 => TransactionHistory[]) transactionHistory; // Mapping of transaction ID to its history
    mapping(address => Transaction[]) buyerTransactions; // Mapping of user address to transaction IDs
    mapping(address => Transaction[]) sellerTransactions; // Mapping of user address to transaction IDs

    // Events
    event TransactionInitiated(
        address indexed buyer,
        address indexed seller,
        string itemName,
        uint256 amount
    );

    event TransactionAccepted(uint256 indexed txId);
    event TransactionCancelled(uint256 indexed txId);
    event PaymentMade(uint256 indexed txId);
    event TransactionCompleted(uint256 indexed txId);

    modifier addressZeroCheck() {
        require(msg.sender != address(0), "Address Zero detected");
        _;
    }

    // Function to initiate a transaction
    function initiateTransaction(
        string memory _transactionTitle,
        string memory _itemName,
        uint256 _amount,
        uint256 _inspectionPeriod,
        string memory _itemDescription,
        string memory _itemCategory,
        string memory _initiatorRole,
        address _buyer,
        address _seller
    ) external addressZeroCheck {
        if (_amount < 1) revert ItemPriceTooLow();
        if (
            keccak256(abi.encodePacked(_initiatorRole)) !=
            keccak256(abi.encodePacked("buyer")) &&
            keccak256(abi.encodePacked(_initiatorRole)) !=
            keccak256(abi.encodePacked("seller"))
        ) revert InvalidRole();
        if (_buyer == address(0) || _seller == address(0))
            revert AddressZeroDetected();

        transactionCount += 1;

        uint256 txId = transactionCount;

        // Create a new transaction
        Transaction storage newTx = transactions[txId];

        newTx.transactionTitle = _transactionTitle;
        newTx.itemName = _itemName;
        newTx.amount = _amount;
        newTx.inspectionPeriod = _inspectionPeriod;
        newTx.itemDescription = _itemDescription;
        newTx.itemCategory = _itemCategory;
        newTx.initiatorRole = _initiatorRole;
        newTx.buyer = _buyer;
        newTx.seller = _seller;
        newTx.transactionStatus = TransactionStatus.PENDING;
        newTx.feePaid = false;
        newTx.settled = false;
        newTx.initiator = msg.sender;

        buyerTransactions[_buyer].push(
            Transaction(
                _transactionTitle,
                _itemName,
                _amount,
                _inspectionPeriod,
                _itemDescription,
                _itemCategory,
                _initiatorRole,
                _buyer,
                _seller,
                TransactionStatus.PENDING,
                false,
                false,
                msg.sender,
                false
            )
        );

        sellerTransactions[_seller].push(
            Transaction(
                _transactionTitle,
                _itemName,
                _amount,
                _inspectionPeriod,
                _itemDescription,
                _itemCategory,
                _initiatorRole,
                _buyer,
                _seller,
                TransactionStatus.PENDING,
                false,
                false,
                msg.sender,
                false
            )
        );

        // Create a new transaction history
        TransactionHistory[] storage txHistory = transactionHistory[txId];

        txHistory.push(
            TransactionHistory({
                createdAt: block.timestamp,
                transactionId: txId,
                description: "Transaction Initiated"
            })
        );

        emit TransactionInitiated(_buyer, _seller, _itemName, _amount);
    }

    // Function for the second party to accept terms of the transaction
    function acceptTransactionTerms(uint256 txId) external addressZeroCheck {
        if (txId < 1 || txId > transactionCount) revert InvalidTransactionId();

        Transaction storage transaction = transactions[txId];

        if (transaction.initiator == msg.sender) revert UnAuthorised();
        if (transaction.buyer != msg.sender && transaction.seller != msg.sender)
            revert UnAuthorised();
        if (transaction.transactionStatus == TransactionStatus.ACCEPTED)
            revert TransactionAlreadyAccepted();
        if (transaction.cancelled) revert TransactionAlreadyCancelled();

        transaction.transactionStatus = TransactionStatus.ACCEPTED;

        // Update transaction history
        TransactionHistory[] storage txHistory = transactionHistory[txId];

        txHistory.push(
            TransactionHistory({
                createdAt: block.timestamp,
                transactionId: txId,
                description: "Transaction Terms Accepted"
            })
        );

        emit TransactionAccepted(txId);
    }

    // Function for canceling a transaction
    function cancelTransaction(uint256 txId) external addressZeroCheck {
        if (txId < 1 || txId > transactionCount) revert InvalidTransactionId();

        Transaction storage transaction = transactions[txId];

        if (transaction.initiator != msg.sender) revert UnAuthorised();
        if (transaction.cancelled) revert TransactionAlreadyCancelled();

        transaction.cancelled = true;
        transaction.transactionStatus = TransactionStatus.CANCELLED;

        // Update transaction history
        TransactionHistory[] storage txHistory = transactionHistory[txId];

        txHistory.push(
            TransactionHistory({
                createdAt: block.timestamp,
                transactionId: txId,
                description: "Transaction Cancelled"
            })
        );

        emit TransactionCancelled(txId);
    }

    // Function for paying to the transaction
    function payToTransaction(uint256 txId) external addressZeroCheck {
        if (txId < 1 || txId > transactionCount) revert InvalidTransactionId();

        Transaction storage transaction = transactions[txId];

        if (transaction.cancelled) revert TransactionAlreadyCancelled();

        address buyer = transaction.buyer;
        uint256 amount = transaction.amount + TRANSACTION_FEE;

        if (msg.sender != buyer) revert UnAuthorised();

        uint256 buyerBalance = usdt.balanceOf(buyer);

        if (buyerBalance < amount) revert InsufficientFunds();

        uint256 allowance = usdt.allowance(buyer, address(this));

        if (allowance < amount) revert IndufficientAllowance();

        // Make the transfer
        usdt.transferFrom(buyer, address(this), amount);

        transaction.feePaid = true;
        totalFees += TRANSACTION_FEE; // Accumulate fees

        // Update transaction history
        TransactionHistory[] storage txHistory = transactionHistory[txId];

        txHistory.push(
            TransactionHistory({
                createdAt: block.timestamp,
                transactionId: txId,
                description: "Transaction Funded by Buyer"
            })
        );

        emit PaymentMade(txId);
    }

    // Function for buyer to release funds to the seller
    function buyerReleaseFunds(uint256 txId) external addressZeroCheck {
        if (txId < 1 || txId > transactionCount) revert InvalidTransactionId();

        Transaction storage transaction = transactions[txId];

        if (transaction.cancelled) revert TransactionAlreadyCancelled();

        address buyer = transaction.buyer;
        uint256 amount = transaction.amount;

        if (msg.sender != buyer) revert UnAuthorised();

        if (transaction.transactionStatus == TransactionStatus.COMPLETED)
            revert TransactionAlreadyClosed();
        if (transaction.settled == true) revert TransactionAlreadyClosed();

        // Send funds to the seller
        transaction.settled = true;
        transaction.transactionStatus = TransactionStatus.COMPLETED;

        usdt.transfer(transaction.seller, amount); // Transfer funds

        // Update transaction history
        TransactionHistory[] storage txHistory = transactionHistory[txId];

        txHistory.push(
            TransactionHistory({
                createdAt: block.timestamp,
                transactionId: txId,
                description: "Funds Released and Transaction Closed"
            })
        );

        emit TransactionCompleted(txId);
    }

    // Get all transactions for user
    // Modify the getAllTransactionsForUser function to loop over the main transaction mapping
    function getAllTransactionsForUser()
        external
        view
        addressZeroCheck
        returns (Transaction[] memory bought, Transaction[] memory sold)
    {
        uint256 buyerCount;
        uint256 sellerCount;

        // First, count how many transactions this user is involved in
        for (uint256 i = 1; i <= transactionCount; i++) {
            if (transactions[i].buyer == msg.sender) {
                buyerCount++;
            } else if (transactions[i].seller == msg.sender) {
                sellerCount++;
            }
        }

        // Create memory arrays based on the counts
        bought = new Transaction[](buyerCount);
        sold = new Transaction[](sellerCount);

        // Now fill in the arrays
        uint256 buyerIndex;
        uint256 sellerIndex;

        for (uint256 i = 1; i <= transactionCount; i++) {
            if (transactions[i].buyer == msg.sender) {
                bought[buyerIndex] = transactions[i];
                buyerIndex++;
            } else if (transactions[i].seller == msg.sender) {
                sold[sellerIndex] = transactions[i];
                sellerIndex++;
            }
        }
    }

    // Function to get a transaction by its ID
    function getTransactionById(
        uint256 txId
    )
        external
        view
        addressZeroCheck
        returns (Transaction memory, TransactionHistory[] memory)
    {
        if (txId < 1 || txId > transactionCount) revert InvalidTransactionId();

        Transaction storage transaction = transactions[txId];
        TransactionHistory[] storage txHistory = transactionHistory[txId];

        if (transaction.seller != msg.sender && transaction.buyer != msg.sender)
            revert UnAuthorised();

        return (transaction, txHistory);
    }

    // Owner withdraw accumulated charges
    function withdrawProfits() external addressZeroCheck {
        require(msg.sender == owner, "Only owner can withdraw");
        uint256 amount = totalFees;
        totalFees = 0; // Reset total fees before withdrawal

        usdt.transfer(owner, amount); // Transfer accumulated fees to the owner
    }
}
