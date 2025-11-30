import { SequelizeDB } from './database/sequelize.js';
import { Student } from './shared/models/student.model.js';
import { Professor } from './shared/models/professor.model.js';
import { User } from './features/auth/users.model.js';

async function testHooks() {
    try {
        await SequelizeDB.authenticate();
        console.log('Connection has been established successfully.');

        
        
        await SequelizeDB.sync();

        console.log('Creating Student...');
        const studentFile = Math.floor(Math.random() * 100000);
        const studentDni = Math.floor(Math.random() * 100000000);
        const student = await Student.create({
            name: 'Test Student',
            lastName: 'Hooks',
            email: `teststudent${studentFile}@example.com`,
            file: studentFile,
            dni: studentDni,
            status: 'activo'
        });
        console.log('Student created:', student.id);

        

        const userStudent = await User.findOne({ where: { file: studentFile.toString() } });
        if (userStudent) {
            console.log('User created for Student:', userStudent.toJSON());
            if (userStudent.password !== studentDni.toString()) {
                console.log('SUCCESS: Student password is hashed (not equal to DNI).');
            } else {
                console.error('FAILURE: Student password is NOT hashed (equal to DNI).');
            }
        } else {
            console.error('FAILURE: User NOT created for Student');
        }

        console.log('Creating Professor...');
        const profFile = `P${Math.floor(Math.random() * 10000)}`;
        const profDni = `D${Math.floor(Math.random() * 100000000)}`;
        const professor = await Professor.create({
            name: 'Test Professor',
            lastName: 'Hooks',
            dni: profDni,
            file: profFile,
            academicTitle: 'PhD',
            email: `testprof${profFile}@example.com`,
            phone: '123456789',
            scheduleAvailability: 'Monday 9-12',
            state: true
        });
        console.log('Professor created:', professor.id);

        const userProf = await User.findOne({ where: { file: profFile } });
        if (userProf) {
            console.log('User created for Professor:', userProf.toJSON());
            if (userProf.password !== profDni) {
                console.log('SUCCESS: Professor password is hashed (not equal to DNI).');
            } else {
                console.error('FAILURE: Professor password is NOT hashed (equal to DNI).');
            }
        } else {
            console.error('FAILURE: User NOT created for Professor');
        }

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await SequelizeDB.close();
    }
}

testHooks();
