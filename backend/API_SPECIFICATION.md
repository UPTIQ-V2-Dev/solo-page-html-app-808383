# API Specification

## Database Models

```prisma
model User {
  id              Int      @id @default(autoincrement())
  email           String   @unique
  name            String?
  password        String
  role            String   @default("USER")
  isEmailVerified Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  Token           Token[]
}

model Token {
  id          Int       @id @default(autoincrement())
  token       String
  type        String
  expires     DateTime
  blacklisted Boolean
  createdAt   DateTime  @default(now())
  user        User      @relation(fields: [userId], references: [id])
  userId      Int
}
```

## API Endpoints

---

EP: POST /auth/register
DESC: Register a new user account.
IN: body:{name:str!, email:str!, password:str!}
OUT: 201:{user:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}, tokens:{access:{token:str, expires:str}, refresh:{token:str, expires:str}}}
ERR: {"400":"Duplicate email address", "422":"Invalid input data", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/register -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
EX_RES_201: {"user":{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":false,"createdAt":"2025-11-13T10:30:00Z","updatedAt":"2025-11-13T10:30:00Z"},"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-11-13T11:00:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-11-20T10:30:00Z"}}}

---

EP: POST /auth/login
DESC: Authenticate user with email and password.
IN: body:{email:str!, password:str!}
OUT: 200:{user:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}, tokens:{access:{token:str, expires:str}, refresh:{token:str, expires:str}}}
ERR: {"401":"Invalid email or password", "422":"Invalid input data", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/login -H "Content-Type: application/json" -d '{"email":"john@example.com","password":"password123"}'
EX_RES_200: {"user":{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-11-13T10:30:00Z","updatedAt":"2025-11-13T10:30:00Z"},"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-11-13T11:00:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-11-20T10:30:00Z"}}}

---

EP: POST /auth/logout
DESC: Logout user by invalidating refresh token.
IN: body:{refreshToken:str!}
OUT: 204:{}
ERR: {"404":"Refresh token not found", "422":"Invalid input data", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/logout -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'
EX_RES_204: {}

---

EP: POST /auth/refresh-tokens
DESC: Generate new access token using refresh token.
IN: body:{refreshToken:str!}
OUT: 200:{access:{token:str, expires:str}, refresh:{token:str, expires:str}}
ERR: {"401":"Invalid or expired refresh token", "422":"Invalid input data", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/refresh-tokens -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'
EX_RES_200: {"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-11-13T11:30:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-11-20T11:00:00Z"}}

---

EP: POST /auth/forgot-password
DESC: Send password reset email to user.
IN: body:{email:str!}
OUT: 204:{}
ERR: {"404":"Email address not found", "422":"Invalid email format", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/forgot-password -H "Content-Type: application/json" -d '{"email":"john@example.com"}'
EX_RES_204: {}

---

EP: POST /auth/reset-password
DESC: Reset user password using reset token.
IN: query:{token:str!}, body:{password:str!}
OUT: 204:{}
ERR: {"401":"Invalid or expired reset token", "422":"Invalid password format", "500":"Internal server error"}
EX_REQ: curl -X POST "/auth/reset-password?token=resetToken123" -H "Content-Type: application/json" -d '{"password":"newPassword123"}'
EX_RES_204: {}

---

EP: POST /auth/send-verification-email
DESC: Send email verification link to authenticated user.
IN: headers:{Authorization:str!}
OUT: 204:{}
ERR: {"401":"Unauthorized - missing or invalid token", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/send-verification-email -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_204: {}

---

EP: POST /auth/verify-email
DESC: Verify user email address using verification token.
IN: query:{token:str!}
OUT: 204:{}
ERR: {"401":"Invalid or expired verification token", "422":"Invalid token format", "500":"Internal server error"}
EX_REQ: curl -X POST "/auth/verify-email?token=verifyToken123"
EX_RES_204: {}

---

EP: POST /users
DESC: Create a new user (admin only).
IN: headers:{Authorization:str!}, body:{name:str!, email:str!, password:str!, role:str!}
OUT: 201:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Duplicate email address", "401":"Unauthorized - missing or invalid token", "403":"Forbidden - insufficient permissions", "422":"Invalid input data", "500":"Internal server error"}
EX_REQ: curl -X POST /users -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"name":"Jane Smith","email":"jane@example.com","password":"password123","role":"USER"}'
EX_RES_201: {"id":2,"email":"jane@example.com","name":"Jane Smith","role":"USER","isEmailVerified":false,"createdAt":"2025-11-13T11:00:00Z","updatedAt":"2025-11-13T11:00:00Z"}

---

EP: GET /users
DESC: Get paginated list of users with optional filtering.
IN: headers:{Authorization:str!}, query:{name:str, role:str, sortBy:str, limit:int, page:int}
OUT: 200:{results:arr[{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}], page:int, limit:int, totalPages:int, totalResults:int}
ERR: {"401":"Unauthorized - missing or invalid token", "403":"Forbidden - insufficient permissions", "422":"Invalid query parameters", "500":"Internal server error"}
EX_REQ: curl -X GET "/users?page=1&limit=10&role=USER" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"results":[{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-11-13T10:30:00Z","updatedAt":"2025-11-13T10:30:00Z"}],"page":1,"limit":10,"totalPages":1,"totalResults":1}

---

EP: GET /users/{userId}
DESC: Get specific user by ID.
IN: headers:{Authorization:str!}, params:{userId:int!}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"401":"Unauthorized - missing or invalid token", "403":"Forbidden - insufficient permissions", "404":"User not found", "422":"Invalid user ID", "500":"Internal server error"}
EX_REQ: curl -X GET /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-11-13T10:30:00Z","updatedAt":"2025-11-13T10:30:00Z"}

---

EP: PATCH /users/{userId}
DESC: Update specific user details.
IN: headers:{Authorization:str!}, params:{userId:int!}, body:{name:str, email:str, password:str}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Duplicate email address", "401":"Unauthorized - missing or invalid token", "403":"Forbidden - insufficient permissions", "404":"User not found", "422":"Invalid input data", "500":"Internal server error"}
EX_REQ: curl -X PATCH /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"name":"John Updated"}'
EX_RES_200: {"id":1,"email":"john@example.com","name":"John Updated","role":"USER","isEmailVerified":true,"createdAt":"2025-11-13T10:30:00Z","updatedAt":"2025-11-13T11:30:00Z"}

---

EP: DELETE /users/{userId}
DESC: Delete specific user account.
IN: headers:{Authorization:str!}, params:{userId:int!}
OUT: 200:{}
ERR: {"401":"Unauthorized - missing or invalid token", "403":"Forbidden - insufficient permissions", "404":"User not found", "422":"Invalid user ID", "500":"Internal server error"}
EX_REQ: curl -X DELETE /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {}

---

EP: POST /mcp
DESC: Handle MCP protocol POST requests.
IN: headers:{Authorization:str!}, body:{method:str!, params:obj}
OUT: 200:{result:obj}
ERR: {"401":"Unauthorized - missing or invalid MCP token", "400":"Invalid MCP request", "500":"Internal server error"}
EX_REQ: curl -X POST /mcp -H "Authorization: Bearer mcpToken123" -H "Content-Type: application/json" -d '{"method":"tools/list","params":{}}'
EX_RES_200: {"result":{"tools":[{"name":"example_tool","description":"Example tool"}]}}

---

EP: GET /mcp
DESC: Handle MCP protocol GET requests.
IN: headers:{Authorization:str!}, query:{method:str!, params:str}
OUT: 200:{result:obj}
ERR: {"401":"Unauthorized - missing or invalid MCP token", "400":"Invalid MCP request", "500":"Internal server error"}
EX_REQ: curl -X GET "/mcp?method=tools/list&params={}" -H "Authorization: Bearer mcpToken123"
EX_RES_200: {"result":{"tools":[{"name":"example_tool","description":"Example tool"}]}}

---

EP: DELETE /mcp
DESC: Handle MCP protocol DELETE requests.
IN: headers:{Authorization:str!}, body:{method:str!, params:obj}
OUT: 200:{result:obj}
ERR: {"401":"Unauthorized - missing or invalid MCP token", "400":"Invalid MCP request", "500":"Internal server error"}
EX_REQ: curl -X DELETE /mcp -H "Authorization: Bearer mcpToken123" -H "Content-Type: application/json" -d '{"method":"resource/delete","params":{"resourceId":"123"}}'
EX_RES_200: {"result":{"success":true}}