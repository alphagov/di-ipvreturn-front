import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const awsRegion = process.env.AWS_REGION;
export const createDynamoDbClient = () => {
    const marshallOptions = {
        // Whether to automatically convert empty strings, blobs, and sets to `null`.
        convertEmptyValues: false,
        // Whether to remove undefined values while marshalling.
        removeUndefinedValues: true,
        // Whether to convert typeof object to map attribute.
        convertClassInstanceToMap: true,
    };
    const unmarshallOptions = {
        // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
        wrapNumbers: false,
    };
    const translateConfig = { marshallOptions, unmarshallOptions };
    const dbClient = new DynamoDBClient({ region: awsRegion });
    return DynamoDBDocument.from(dbClient, translateConfig);
};
