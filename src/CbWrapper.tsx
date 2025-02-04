import React,{PropsWithChildren, useState, useEffect} from "react";
import ConfigbeeClient from "configbee-client-core";
import { CbContext,CbContextType } from "./context";


export interface CbWrapperProps{
    children: React.ReactElement | React.ReactNode | undefined

    accountId: string
    projectId: string
    environmentId: string

    targetProperties?: {[key: string]: string}

    customSources?: any
}

const CbWrapper:React.FC<PropsWithChildren<CbWrapperProps>> = ( {
    children, accountId, projectId, environmentId, targetProperties, customSources}) => {

    const [value, setValue] = useState<CbContextType>({})


    const refreshFromClient = (client: ConfigbeeClient.Client) => {
        setValue({client:client,

            status: client.status,
            targetingStatus: client.targetingStatus,

            flags: client.getAllFlags(),
            numbers: client.getAllNumbers(),
            texts: client.getAllTexts(),
            jsons: client.getAllJsons()
            })
    }

    useEffect(()=>{
        if(value.client === undefined){
            const initParams:ConfigbeeClient.ClientParams = {
                accountId: accountId, projectId: projectId, environmentId:environmentId,
                targetProperties: targetProperties,
                onReady: ()=>{refreshFromClient(createdClient)},
                onUpdate: ()=>{refreshFromClient(createdClient)}
            }
            if(customSources){
                initParams.sources = customSources
            }
            const createdClient = ConfigbeeClient.init(initParams)
            refreshFromClient(createdClient)
        }
        return ()=>{
            if(value.client){
                //todo close client when available
            }
        }
    },[])

    useEffect(()=>{
        if(value.client != undefined){
            if(targetProperties!=undefined){
                value.client.setTargetProperties(targetProperties)
            }
            else{
                value.client.unsetTargetProperties()
            }
        }
    },[targetProperties])

    return (
        <CbContext.Provider value={value}>
            {children}
        </CbContext.Provider>
    )
}

export default CbWrapper;