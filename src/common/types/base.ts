import { AddressPath, AssetType, BlockPath, Extension, FiatCurrency, Language, TokenPath, TxPath, TypeNode } from "../enum/base"

export type Project = {
     guid: string
     name: string
     description: string
     networks: string[]
     assets: string[]
     accounts: string[]
}

export type Accounts = {
     guid: string
     label: string
     address: string
     networkId: string
     index: string
}

export interface IAccounts {
     [guid: string]: Accounts
}

export type AddressBook = {
     guid: string
     label: string
     address: string
     description: string
     networkId: string
}

export interface IAddressBook {
     [guid: string]: AddressBook
}

export type AssetSupport = {
     email?: string;
     url?: string;
}

export type AssetSocials = {
     facebook?: string;
     reddit?: string;
     telegram?: string;
     twitter?: string;
     blog?: string;
     chat?: string;
     forum?: string;
     github?: string;
     gitter?: string;
     linkedin?: string;
     youtube?: string;
     instagram?: string;
     slack?: string;
}
export type AssetMappings = {
     coinCapId?: string;
     coinGeckoId?: string;
     cryptoCompareId?: string;
     cryptoCurrencyIconName?: string;
     dexAgId?: string;
}

export type Asset = {
     guid: string
     symbol: string
     networkId: string
     decimal: number
     type: AssetType
     support?: AssetSupport
     social?: AssetSocials
     mappings?: AssetMappings
     isCustom: boolean
     website?: string
     contractAddress?: string
}

export interface IAsset {
     [guid: string]: Asset
}


export type Contract = {
     guid: string;
     name: string;
     address: string;
     abi: string;
     networkId: string;
}

export interface IContracts {
     [guid: string]: Contract
}

export interface NetworkExplorer {
     origin: string;
     txPath: TxPath;
     tokenPath: TokenPath;
     addressPath: AddressPath;
     blockPath: BlockPath;
     name: string;
}

export interface GasPriceSettings {
     min: number;
     max: number;
     initial: number;
}

export interface NetworkNode {
     name: string;
     url: string;
     service: string;
     type: TypeNode;
     disableByDefault?: boolean;
}

export type Network = {
     networkId: string
     name: string
     chainId: number
     isCustom: boolean
     baseAsset: string;
     baseSymbol: string,
     contracts: string[]
     nodes: Node[];
     blockExplorer: NetworkExplorer
     gasPriceSettings: GasPriceSettings;
     isTestnet: boolean
     supportsEIP1559: boolean
     shouldEstimateGasPrice: boolean
     color?: string;
}

export interface INetworks {
     [networkId: string]: Network
}

export interface ISettings {
     fiatCurrency: FiatCurrency
     darkMode: false
     dashboardAccounts: string[]
     excludedAssets: string[]
     language: Language
     isDemoMode: true
     canTrackProductAnalytics?: boolean
     userId: string
     extension: Extension
}


export type DataLocalSettings = {
     accounts: IAccounts
     addressBook: IAddressBook
     assets: IAsset
     contracts: IContracts
     networks: INetworks
     settings: ISettings
     version: string
}