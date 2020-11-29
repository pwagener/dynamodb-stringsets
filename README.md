# DynamoDB StringSets Example

This repository exists to demonstrate a confusing point (bug?) about using DynamoDB's DocumentClient
in relation to StringSets.

# Running the Example

Install & run the example with:

```
$ npm install
...

$ ./index.js 
Running On: darwin 19.6.0
Node version: v12.20.0
AWS SDK version: 2.799.0
-------------------------
Creating table "StringSets-Example"
Waiting for "StringSets-Example" status to be "ACTIVE"
  Table status is: CREATING
  Table status is: ACTIVE
Put String Set "["Peter, "Paul, "Mary"]" into "StringSets-Example" with key "Names" and attribute "names"
Retrieved Item with key "Names" from "StringSets-Example"
The raw Item:  {
  PK: 'Names',
  names: Set {
    wrapperName: 'Set',
    values: [ 'Mary', 'Paul', 'Peter' ],
    type: 'String'
  }
}
The raw Item.names.values: [ 'Mary', 'Paul', 'Peter' ]
-------------------------
Done.  To clean up, run:
    ./src/deleteTable.js
```

# What It Does
Running `index.js` does three things:

- Create a DynamoDB Table called "StringSets-Example" (see [createTable.js](src/createTable.js))
- Using `DocumentClient`, put an array of strings (see [putStringSetValue.js](src/putStringSetValue.js))
- Using `DocumentClient`, retrieve the value that was just put (see [getStringSetValue.js](src/getStringSetValue.js))

# Why I'm Confused

The `DocumentClient` is supposed to automatically handle marshalling/unmarshalling values from raw 
JS types to DynamoDB's more descriptive `AttributeMap` types.  However, in this case it does not.

Specifically, I'd expect `Item.names` to be `[ 'Mary', 'Paul', 'Peter']`.  Instead, `Item.names` is
a `Set`, with `Item.names.values` having the array value.
