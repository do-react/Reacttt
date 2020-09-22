import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String], //문자열로 이루어진 배열
  publicshedDate: {
    type: Date,
    default: Date.now, //현재 날짜를 기본값으로 지정
  },
});

const Post = mongoose.model('Post', PostSchema); //model()함수는 두개의 파라미터가 필요함 첫번째는 스키마 이름, 두번째는 스키마 객체
export default Post;
