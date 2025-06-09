export enum ApiMethodEnums {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    PUT = 'PUT'
}

export interface CallApiType<TPayload> {
    method?: ApiMethodEnums;
    data?: TPayload;
    url: string;
    params?: {[name:string]:string};
    headers?: Record<string,string>;
}

// export interface ResposeInterface<Payload>{
//     data: Payload;
//     message: string;
// }