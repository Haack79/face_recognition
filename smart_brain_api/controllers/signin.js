const handleSignin = (db, bcrypt) => (req, res,) => {
    const { email, password } = req.body; 
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
     }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        } else {
            res.status(400).json('wrong credentials')
        }
        // console.log(data); 
    })
    .catch(err => res.status(400).json('wrong credentials'))
    // bcrypt.compare("password", 'a;osiefja;soeifas;lfkjas;dlfkjad;f', function(err, res) {
    //     //res = true 
    // });
    // bcrypt.compare("cookies", 'asldkfja;sdkf', function(err, res) {
    // });
    // if (req.body.email === database.users[0].email && 
    //     req.body.password === database.users[0].password) {
    //         res.json(database.users[0]);
    //         //res.json('success');
    //     } else {
    //         res.status(400).json('error logging in');
    //     }
    // res.json('signin');
}

module.exports = {
    handleSignin: handleSignin 
}
// es6 -> export const handleSignin = handleSignin;