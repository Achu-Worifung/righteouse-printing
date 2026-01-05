import dotenv from 'dotenv';
dotenv.config();
import { BlobServiceClient } from '@azure/storage-blob';

// Get connection string from environment
const connection_string = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!connection_string) {
  throw new Error("AZURE_STORAGE_CONNECTION_STRING is not defined. Please add it to your .env file.\nYou can find it in Azure Portal: Storage Account > Access keys > Connection string");
}

// Create blob service client from connection string
const blob_service_client = BlobServiceClient.fromConnectionString(connection_string);


// getting container name 
const container_name = process.env.CONTAINER_NAME;
if (!container_name) {
  throw new Error("CONTAINER_NAME is not defined in environment variables");
}

const container_client = blob_service_client.getContainerClient(container_name);

// uploading a blob 
const blobName = 'sample-blob.txt';
//creating a blob client
const block_blob_client = container_client.getBlockBlobClient(blobName);

// print blob name 
console.log(`\nUploading to Azure storage as blob:\n\t${blobName} \n\turl ${block_blob_client.url}`);

// upload data to the blob 
const data = 'Hello, World!';
const upload_blob_response = await block_blob_client.upload(data, data.length);
console.log(`Blob was uploaded successfully. requestId: ${upload_blob_response.requestId}`);