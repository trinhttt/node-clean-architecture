# node-clean-architecture
Apply CRUD with clean-architecture
Populate + Virtual
Search + sort + pagination
Validation
Login manual
Login Facebook (Get token here: https://github.com/trinhttt/SNSLogin)

Way to use {{id_token}} 
Tests in postman:
var data = JSON.parse(responseBody);
pm.environment.set("id_token", data.data.token);