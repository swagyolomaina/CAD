import * as dynamoDbLib from "./Libs/dynamodb-lib";
import {success, failure} from "./libs/response-lib";

export async function main(event, context) {
    const params = {
        TableName: 'table',
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            tableId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call('delete,params');
        return success({status:true});
    } catch (e) {
        return failure({status:false});
    }
}