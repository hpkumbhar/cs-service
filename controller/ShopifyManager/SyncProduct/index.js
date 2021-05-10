const Shopify = require('../Shopify')

const SYNC = async ({ shopName, accessToken, sinceId = 0, limit = 0 }) => {
    //call to shopify fetch one batch
    let response = await Shopify.fetchProduct(shopName, accessToken, { since_id: sinceId, limit })
    console.log(response.data.products.length)

    //save the data




    
    //call next batch
    if(response.data.products.length < limit) {
        console.log("SYNC complete..")
    } else {
        //cal nect since id
        let nextSinceId = response.data.products[response.data.products.length - 1].id;
        console.log("nextSinceId", nextSinceId)
        await SYNC({ shopName, accessToken, sinceId: nextSinceId, limit})
    }
    return;
}



module.exports = {
    SYNC
}

SYNC({ shopName: 'grofers-orders.myshopify.com', accessToken: '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',  limit: 2 })
.then(console.log)
.catch(console.log)