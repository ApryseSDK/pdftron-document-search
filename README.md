# PDFTron Document Search

PDFTron Document Search demonstrates building an application where users can search across multiple documents using [PDFTron PDF SDK](https://www.pdftron.com) for text extraction and viewing of the documents, [Firebase](https://firebase.google.com/) for storage and [Algolia](https://www.algolia.com/) for searching.

[!Screenshot](https://github.com/PDFTron/pdftron-document-search/blob/master/search.png)

This repo is designed to help to get started in creating your own document searching workflow.

## Install

```
npm install
```

## Algolia Configuration

This application uses Algolia to search documents. However, be aware that Algolia is not the only third-party search provider. Consider alternatives such as [ElasticSearch](https://www.elastic.co/).

To get started with this sample, please register a new app with [Algolia](https://www.algolia.com/users/sign_up).

Create a new index:
![Screenshot](https://github.com/PDFTron/pdftron-document-search/blob/master/algolia2.png)

After you configured your app, create `.env` file in the root of the directory and place the following:

```
REACT_APP_ALGOLIA_APP_ID=your_key_goes_here
REACT_APP_ALGOLIA_API_KEY=your_key_goes_here
REACT_APP_ALGOLIA_SEARCH_KEY=your_key_goes_here
REACT_APP_ALGOLIA_INDEX_NAME=document_search
```
The above information can be found under API Keys in your Algolia Dashboard.
![Screenshot](https://github.com/PDFTron/pdftron-document-search/blob/master/algolia.png)

Now you can run the application and start uploading your documents.

## Firebase Configuration

This application uses Firebase to store documents. You can use any other backend of your choice. 
However, to get started with this sample, please register a new app with [Firebase](https://firebase.google.com/).

After you have registered an app, create `.env` file in the root of the directory and place the following:

```
REACT_APP_API_KEY=your_key_goes_here
REACT_APP_MESSAGING_SENDER_ID=your_key_goes_here
REACT_APP_APP_ID=your_key_goes_here
REACT_APP_AUTH_DOMAIN=your_domain_goes_here
REACT_APP_DATABASE_URL=your_database_go_here
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_storage_bucket
```
The above information can be found under settings of your Firebase app.
![Screenshot](https://github.com/PDFTron/pdftron-sign-app/blob/master/firebase.png)

Make sure you create a storage bucket, and enable authentication for email and Google.
![Screenshot](https://github.com/PDFTron/pdftron-sign-app/blob/master/firebase_authentication.png)

Now you can run the application and start uploading your documents.

## CORS

You will need to set up CORS on your Firestore to allow WebViewer to access files stored in your bucket. I created a CORS file called `cors.json`: 

```
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```

And then used gsutil to update it:
https://cloud.google.com/storage/docs/configuring-cors

## Run

```
npm start
```

## Project structure

```
src/
  app/             - Redux Store Configuration
  components/      - React components
    Navigate/            - Component responsible for navigating between different screens
    PasswordReset/       - Reset password
    Profile/             - Profile information and a sign out button
    Search/              - Search previously uploaded documents
    SignIn/              - Sign in
    SignUp/              - Sign up
    Upload               - Upload a document, which will be indexed for searching and saved to file storage.
    View/                - View document with the search result highlighted
  App              - Configuration for navigation, authentication
  index            - Entry point and configuration for React-Redux
  firebase/        - Firebase configuration for authentication, updating documents, storing PDFs
  tools/           - Helper function to copy over PDFTron dependencies into /public on post-install
```

## API documentation

See [API documentation](https://www.pdftron.com/documentation/web/guides/ui/apis).

## Contributing

See [contributing](./CONTRIBUTING.md).

## License

See [license](./LICENSE).
![](https://onepixel.pdftron.com/webviewer-ui)
