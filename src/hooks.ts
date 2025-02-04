import {useContext, useState, useEffect} from "react";
import { CbContext,CbContextType } from "./context";
import ConfigbeeCore from "configbee-client-core"
import { normalizeKeys as normalizeKeysFunction } from "./utils";

export const useCbFlags = ({normalizeKeys}:{normalizeKeys: boolean}={normalizeKeys:true}) => {
    const cbContext = useContext<CbContextType>(CbContext);

    const [flags, setFlags] = useState<ConfigbeeCore.CbFlagsType>({})

    useEffect(() => {
        if(cbContext !== undefined && cbContext.status=="ACTIVE"){
            let normalizedFlags = cbContext.flags || {}
            if(normalizeKeys){
                normalizedFlags = normalizeKeysFunction(normalizedFlags)
            }
            setFlags(normalizedFlags)
        }
        else
            setFlags({})
    },[cbContext])
    
    return flags
}

export const useCbNumbers = ({normalizeKeys}:{normalizeKeys: boolean}={normalizeKeys:true}) => {
    const cbContext = useContext<CbContextType>(CbContext);

    const [numbers, setNumbers] = useState<ConfigbeeCore.CbNumbersType>({})

    useEffect(() => {
        if(cbContext !== undefined && cbContext.status=="ACTIVE"){
            let normalizedNumbers = cbContext.numbers || {}
            if(normalizeKeys){
                normalizedNumbers = normalizeKeysFunction(normalizedNumbers)
            }
            setNumbers(normalizedNumbers)
        }
        else
        setNumbers({})
    },[cbContext])
    
    return numbers
}

export const useCbTexts = ({normalizeKeys}:{normalizeKeys: boolean}={normalizeKeys:true}) => {
    const cbContext = useContext<CbContextType>(CbContext);

    const [texts, setTexts] = useState<ConfigbeeCore.CbTextsType>({})

    useEffect(() => {
        if(cbContext !== undefined && cbContext.status=="ACTIVE"){
            let normalizedTexts = cbContext.texts || {}
            if(normalizeKeys){
                normalizedTexts = normalizeKeysFunction(normalizedTexts)
            }
            setTexts(normalizedTexts)
        }
        else
        setTexts({})
    },[cbContext])
    
    return texts
}

export const useCbJsons = ({normalizeKeys}:{normalizeKeys: boolean}={normalizeKeys:true}) => {
    const cbContext = useContext<CbContextType>(CbContext);

    const [jsons, setJsons] = useState<ConfigbeeCore.CbJsonsType>({})

    useEffect(() => {
        if(cbContext !== undefined && cbContext.status=="ACTIVE"){
            let normalizedJsons = cbContext.jsons || {}
            if(normalizeKeys){
                normalizedJsons = normalizeKeysFunction(normalizedJsons)
            }
            setJsons(normalizedJsons)
        }
        else
        setJsons({})
    },[cbContext])
    
    return jsons
}

export const useCbStatus = () => {
    const cbContext = useContext<CbContextType>(CbContext);

    const [status, setStatus] = useState<ConfigbeeCore.CbStatusType>()

    useEffect(() => {
        if(cbContext !== undefined)
            setStatus(cbContext.status)
        else
            setStatus(undefined)
    },[cbContext])
    
    return status
}
export const useCbTargetingStatus = () => {
    const cbContext = useContext<CbContextType>(CbContext);

    const [targetingStatus, setTargetingStatus] = useState<ConfigbeeCore.CbStatusType>()

    useEffect(() => {
        if(cbContext !== undefined)
            setTargetingStatus(cbContext.targetingStatus)
        else
            setTargetingStatus(undefined)
    },[cbContext])
    
    return targetingStatus
}

type CbOperations = {
    setTargetProperties: ({}:{[key: string]: string}) => void
    unsetTargetProperties: () => void
}

export const useCbOperations = ():CbOperations => {
    const cbContext = useContext<CbContextType>(CbContext);
    
    return {
        setTargetProperties: (targetProperties:{[key: string]: string}) =>{
            if(cbContext.client){
                cbContext.client.setTargetProperties(targetProperties)
            }
            else{
                throw "Unable set Target Properties"
            }
        },
        unsetTargetProperties: () =>{
            if(cbContext.client){
                cbContext.client.unsetTargetProperties()
            }
            else{
                throw "Unable unset Target Properties"
            }
        }
    }
}
