### routing group 

`()`

next.js will ignore folder which is writen like (auth) ...  

### dynamic route

`[]` 

a folder form of this defines a dynamic routes ..ex. blog[slug] .. 

###  Catch-All Segment

`[...]`

if you have nested folder structure one inside one or numbers of folders inside one like /courses/webdesign/css/flex then this kind of structure will helpful

### Catch all [[…slug]]

You can also use double brackets like `[[...slug]]` to make the catch-all **optional** (so it can match `/docs` as well as `/docs/anything/here`).
