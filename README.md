

## Sample GraphQL Queries:

### Start server (in Development)
`localhost:<PORT>/graphql`

### Getting All Clients
```{
  clients {
    name
  }
}
```

### Getting a Single Client (by ID)
```{
  client(id:1){
    name,
    email,
    phone,
  }
}
```
