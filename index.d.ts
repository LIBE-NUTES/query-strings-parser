declare var queryStringsParser: queryStringsParser.QueryStringsParser
export = queryStringsParser

declare namespace queryStringsParser {
    export interface QueryStringsParser {
        (options?: IOptions): any
    }

    export interface IOptions {
        default?: IDefault
        use_page?: boolean
        client_db?: string
    }

    export interface IDefault {
        fields?: object
        sort?: object
        filters?: object
        pagination?: IPagination
    }

    export interface IPagination {
        limit?: number
        page?: number
        skip?: number
    }
}

