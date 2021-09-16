let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
const {coin} = require('../../config/contract');
let { ethers } = require('ethers');

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}
let random = between(1,900000000)


router.route('/set-win').post(async (req,res,next)=>{
    console.log(req.body.amount, req.body.address)
    const rpcUrl = `https://rpcapi.fantom.network`;
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const CoinContract = new ethers.Contract(coin.fantom,coin.abi,provider);

    const adminaccount = {
        publicKey:"0xeef1Ca43C1Ba1faDF1283b008a85C3826c7E36C5",
        privateKey:"0x1d06ddf483f5c4a7ff58423efb18fcc10b3398fe5f1c8bf1ad2b0ecd7b675730"
    }


    const adminWallet = new ethers.Wallet(adminaccount.privateKey, provider);

    const SignedCoinContract = CoinContract.connect(adminWallet);
    var amount = Number(req.body.amount).toFixed(0);
    var tx =await SignedCoinContract.transfer(req.body.address,ethers.utils.parseUnits(amount.toString(),coin.decimals));
    if(tx!=null) {
      await tx.wait()   
      res.json({data:tx})
    }
})

module.exports = router;