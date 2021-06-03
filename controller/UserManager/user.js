const { insert, del, fetch, fetchAll } = require("../../aws/index");

const addUser = async (data) => {
    const params = {
            TableName: "User",
            Item:{
                ...data
        }
    }
    return await insert(params);
}

// const data = {
//     userId: "3",
//     name: "Nimish",
//     password: "123456",
//     email: "nimish@gmail.com"
// }

// addUser(data);

const deleteUser = async (data) => {
    var params = {
            TableName: 'User',
            Key:{
                "user_id": data.userId
            }
        }
    return await del(params)
}

const fetchUser = async (data) => {
    var params = {
        ExpressionAttributeValues: {
            ':v': data.email
        },
            TableName: 'User',
            IndexName: 'email-index',
            KeyConditionExpression: "email = :v",
            
        }
    return await fetch(params)
}

const fetchAllUsers = async (data) => {
    const params = {
        TableName: "User"
    }
    return await fetchAll(params)
}

module.exports = {
    addUser,
    deleteUser,
    fetchUser,
    fetchAllUsers
}