"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, full_name, email, password, role, creation_date) {
        this.id = id;
        this.full_name = full_name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.creation_date = creation_date;
    }
}
exports.default = User;
// @Entity({ name: 'user' })
// export class TypeormUser extends BaseEntity implements User {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;
//   @Column()
//   email: string;
//   @Column()
//   password: string;
// };
// An adapter for the UserRepository using typeorm,
// but it could be using any other implementation
// export class DbUserRepository implements UserRepository {
//   create(user: Omit<User, 'id'>): Promise<User> {
//     const userRepository = TypeormUser.getRepository();
//     const newUser = userRepository.create(user);
//     return userRepository.save(newUser);
//   };
//   async findByEmail(email: string): Promise<User | null> {
//     const userRepository = TypeormUser.getRepository();
//     return userRepository.findOne({ where: { email } });
//   };
// };
//# sourceMappingURL=userRepository.js.map