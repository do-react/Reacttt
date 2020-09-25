import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

UserSchema.methods.setPassword = async function (password) {
  //인스턴스 메서드를 작성할 때는 화살표함수가 아닌 function 키워드를 사용하여 구현해야 한다. 함수 내부에서 this에 접근해야 하기 때문에 this는 문서 인스턴스를 가리킨다.
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.statics.findByUsername = function (username) {
  //스태틱 메서드, 이 메서드는 username으로 데이터를 찾을 수 있게 해준다.
  return this.findOne({ username }); //스태틱함수에서의 this는 모델을 가리킨다. 여기선 User을 가리킨다.
};

const User = mongoose.model('User', UserSchema);
export default User;
