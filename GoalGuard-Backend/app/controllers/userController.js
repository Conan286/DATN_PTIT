const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _const = require('../config/constant');

const userController = {

    getAllUsers: async (req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10000;
        const offset = (page - 1) * limit;

        try {
            const query = `SELECT * FROM users LIMIT ${offset}, ${limit}`;
            const [users] = await db.execute(query);
            res.status(200).json({ data: users });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createUser: async (req, res) => {
        try {
            const { email, phone, username, role, status, password, age, gender } = req.body;

            const [checkEmailExist] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
            if (checkEmailExist.length > 0)
                return res.status(200).json("User with this email already exists");

            const [checkPhoneExist] = await db.execute('SELECT * FROM users WHERE phone = ?', [phone]);
            if (checkPhoneExist.length > 0)
                return res.status(200).json("User with this phone number already exists");

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);

            const query = `
                INSERT INTO users (email, phone, username, password, role, status, age, gender) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                email || null,
                phone || null,
                username || null,
                hashed || null,
                role || null,
                status || null,
                age || null,
                gender || null,
            ];

            const [result] = await db.execute(query, values);

            res.status(200).json({
                id: result.insertId,
                email, phone, username, role, status, age, gender
            });

        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;

            const [checkUserExist] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
            if (checkUserExist.length === 0)
                return res.status(404).json("User not found");

            await db.execute('DELETE FROM users WHERE id = ?', [userId]);
            res.status(200).json("Delete success");

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // ⭐ UPDATED: full age + gender + fix lỗi thiếu password
    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const { username, email, password, role, phone, status, image_qr, age, gender } = req.body;

            const [checkEmailExist] = await db.execute(
                'SELECT * FROM users WHERE email = ? AND id != ?', 
                [email, userId]
            );

            if (checkEmailExist.length > 0) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            let hashedPassword = null;

            if (password) {
                const salt = await bcrypt.genSalt(10);
                hashedPassword = await bcrypt.hash(password, salt);
            }

            const updateQuery = `
                UPDATE users 
                SET username = ?, email = ?, password = ?, role = ?, phone = ?, status = ?, 
                    image_qr = ?, age = ?, gender = ?
                WHERE id = ?
            `;

            const updatedValues = [
                username || null,
                email || null,
                hashedPassword || null,
                role || null,
                phone || null,
                status || null,
                image_qr || null,
                age || null,
                gender || null,
                userId
            ];

            const [result] = await db.execute(updateQuery, updatedValues);

            if (result.affectedRows === 0)
                return res.status(404).json({ message: 'User not found' });

            res.status(200).json("Update success");

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    logout: async (req, res) => { },

    searchUserByEmail: async (req, res) => {
        const email = req.query.email;
        try {
            const [userList] = await db.execute(
                'SELECT * FROM users WHERE email LIKE ?',
                [`%${email}%`]
            );
            res.status(200).json({ data: userList });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // ⭐ UPDATED: trả về age + gender
    getProfile: async (req, res) => {
        jwt.verify(req.headers.authorization, _const.JWT_ACCESS_KEY, async (err, decodedToken) => {
            if (err) return res.status(401).send('Unauthorized');

            try {
                const userId = decodedToken.user.id;

                const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
                if (user.length === 0)
                    return res.status(404).json({ message: 'User not found' });

                const u = user[0];

                res.status(200).json({
                    user: {
                        id: u.id,
                        email: u.email,
                        phone: u.phone,
                        username: u.username,
                        password: u.password,
                        role: u.role,
                        status: u.status,
                        image: u.image,
                        created_at: u.created_at,
                        updated_at: u.updated_at,
                        image_qr: u.image_qr,
                        age: u.age,
                        gender: u.gender
                    },
                    iat: decodedToken.iat,
                    exp: decodedToken.exp
                });

            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    },

    //  UPDATED: hỗ trợ age + gender
    updateProfile: async (req, res) => {
        try {
            const userId = req.params.id;
            const { username, email, phone, status, image, role, image_qr, age, gender } = req.body;

            const fields = [];
            const values = [];

            const push = (field, value) => {
                fields.push(`${field} = ?`);
                values.push(value);
            };

            if (username) push('username', username);
            if (email) push('email', email);
            if (phone) push('phone', phone);
            if (status) push('status', status);
            if (image_qr) push('image_qr', image_qr);
            if (image) push('image', image);
            if (role) push('role', role);
            if (age !== undefined) push('age', age);
            if (gender) push('gender', gender);

            if (fields.length === 0)
                return res.status(400).json({ message: 'No fields to update' });

            const updateQuery = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
            values.push(userId);

            const [result] = await db.execute(updateQuery, values);

            if (result.affectedRows === 0)
                return res.status(404).json({ message: 'User not found' });

            res.status(200).json("Profile updated successfully");

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    changePassword: async (req, res) => {
        try {
            const userId = req.params.id;
            const { currentPassword, newPassword } = req.body;

            const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);

            if (user.length === 0)
                return res.status(200).json({ message: 'User not found' });

            const isPasswordValid = await bcrypt.compare(currentPassword, user[0].password);

            if (!isPasswordValid)
                return res.status(200).json({ message: 'Current password is incorrect' });

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            await db.execute(
                'UPDATE users SET password = ? WHERE id = ?',
                [hashedNewPassword, userId]
            );

            res.status(200).json("Password changed successfully");

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;

            const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);

            if (user.length === 0)
                return res.status(404).json({ message: 'User not found' });

            res.status(200).json(user[0]);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

};

module.exports = userController;
