import { AppDataSource } from './data-source';
import { app } from './app';
import 'dotenv/config'

const PORT = process.env.PORT || 3000

AppDataSource.initialize()
    .then(() => {
        console.log('Server started!')
        app.listen(PORT, () => {  console.log('Server running on port ' + PORT) })
    }).catch((err)=> {
        console.error('Error during Data Source initialization ', err)
    })

