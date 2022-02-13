const fs = require('fs');
const Web3 = require('web3');
const abi = require('../contract-build/ERIS.json');
const BigNumber = require('bignumber.js');
const owner = '0x04804a782F046C0c9E22353d77C6415812239b32';
const customer = '0x45699F0bCF9109f8bB99bdf230d22dFEa2fd9FeA';
const log = console.log;

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
const contract_addr = fs.readFileSync('./test/migration-info.json').toString().trim();
const erisToken = new web3.eth.Contract(abi.abi, contract_addr);

log("[ERIS] Testing rebase ....");
doRebaseRepeat(48*7);
getBalanceOfAddr(erisToken, customer);

async function test_rebase() {
    let totalSupply = new BigNumber(await erisToken.methods.totalSupply().call());
    const supply = totalSupply.times(0.0003958).toFixed(0);

    log("[ERIS] total supply = ", supply);
    await erisToken.methods.rebase(1, supply)
        .send({from: owner},
            function(err, result) {
                if (err)
                    log("[KGS] Rebase eror! ", err);
                else 
                    log("[KGS] Rebase succeeded!", web3.utils.fromWei(result));
            }
        );
}

async function getBalanceOfAddr(token, addr)
{
    const balance = await token.methods.balanceOf(addr).call();
    const tokenBalance = web3.utils.fromWei(balance);
    log("[ERIS] %s's token balance = %f", addr, tokenBalance);
    return tokenBalance;
}

async function doRebaseRepeat(count)
{
    for(let i = 0; i < count; i ++)
        await test_rebase();
}