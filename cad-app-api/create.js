import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import {success, failure} from './libs/response-lib';

export async function main(event, context) {
    const data = JSON.parse(event, context);
    const params ={
        TableName: 'table',
        Items: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            projectName: data.projectName,
            requiredSkills: data.requiredSkills,
            projectFile: data.projectFile,
            //status: 
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call('put', params);
        return success(params.Item);
    } catch (e) {
        return failure({status: false});
        }    
}