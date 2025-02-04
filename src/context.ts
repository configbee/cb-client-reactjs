import { createContext } from 'react'
import ConfigbeeClient from 'configbee-client-core'

export interface CbContextType {
    client?: ConfigbeeClient.Client
    status?: ConfigbeeClient.CbStatusType
    targetingStatus?: ConfigbeeClient.CbStatusType
    flags?: ConfigbeeClient.CbFlagsType
    numbers?: ConfigbeeClient.CbNumbersType
    texts?: ConfigbeeClient.CbTextsType
    jsons?: ConfigbeeClient.CbJsonsType
}

const CbContext = createContext<CbContextType>({})

export {CbContext}