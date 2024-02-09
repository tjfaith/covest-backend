model User {
    id      String      @id @default(cuid())
    email   String   @unique
    first_name    String?
    last_name   String?
    other_names String?
    phone_number  String?   
  }