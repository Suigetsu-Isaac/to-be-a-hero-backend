import { test, development, production } from '../../knexfile.js';
export default function validate (env){
    console.log(env)
    if (env.NODE_ENV === 'test') return test
    if (env.NODE_ENV === 'production') return production
    return development
}