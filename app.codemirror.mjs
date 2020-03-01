import Signer  from '@waves/signer';
import ProviderSeed  from '@waves/provider-seed';
import Provider from '@waves.exchange/provider-web';
import transactions from '@waves/waves-transactions';
import authtorization from '/home/sergey/Desktop/telegram/node/authorization-waves/waves-bundle-auth/auth.mjs';
import custom from '/home/sergey/Desktop/telegram/node/authorization-waves/waves-custom-api/api.mjs'
export default {
        Provider:Provider,
        ProviderSeed:ProviderSeed,
        Signer:Signer,
        transactions:transactions,
        libs:transactions['libs'],
        auth: authtorization,
        api:custom
}