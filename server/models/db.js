const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser :"true"})
	.then(() => console.log('MongoDB connected...'))
	.catch(() => console.log(err));