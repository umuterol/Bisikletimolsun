const db = require("../models");


const identity_status_type = [
    {
        id: "confirmed",
    },
    {
        id: "unconfirmed",
    },
    {
        id: "blocked",
    },
    {
        id: "waiting",
    }
]

const wallet_transaction_type = [
    {
        id: "add",
    },
    {
        id: "buy",
    },
    {
        id: "earn",
    }
]

const bicycle_status_type = [
    {
        id: "using",
    },
    {
        id: "parked",
    },
    {
        id: "defective",
    }
]

const drive_transaction_type = [
    {
        id: "started",
    },
    {
        id: "finished",
    },
]

const drive_status_type = [
    {
        id: "active",
    },
    {
        id: "notactive",
    },
]

const bicycles_transaction_type = [
    {
        id: "mining"
    },
    {
        id: "withdraw"
    },
]

const bicycle_add_meeting_status_type = [
    {
        id: "waiting",
    },
    {
        id: "confirmed",
    },
    {
        id: "unconfirmed",
    },
]

const identity = {
    phone: "+905414451016",
    tc: "10655892646",
    name: "Umut Can",
    surname: "EROL",
    birth: "1984-02-02",
    email: "umut@gmail.com",
}


const defaultDatabaseDataHandler = async () => {
    await db.identity_status_type.bulkCreate(identity_status_type);
    await db.wallet_transaction_type.bulkCreate(wallet_transaction_type);
    await db.bicycle_status_type.bulkCreate(bicycle_status_type);
    await db.drive_transaction_type.bulkCreate(drive_transaction_type);
    await db.drive_status_type.bulkCreate(drive_status_type);
    await db.bicycles_transaction_type.bulkCreate(bicycles_transaction_type);
    await db.identity.create(identity);
    await db.bicycle_add_meeting_status_type.bulkCreate(bicycle_add_meeting_status_type);
}

module.exports = defaultDatabaseDataHandler;