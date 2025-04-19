import { useState, useEffect } from "react";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  // Load dữ liệu từ localStorage khi trang load
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(savedReviews);
  }, []);

  // Lưu dữ liệu vào localStorage khi reviews thay đổi
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && comment) {
      const newReview = {
        name,
        rating,
        comment,
        date: new Date().toLocaleDateString(),
      };
      setReviews([newReview, ...reviews]);
      setName("");
      setRating(5);
      setComment("");
      setSuccessMessage("Cảm ơn bạn đã đánh giá!"); // Hiển thị thông báo thành công
      setErrorMessage(""); // Xóa thông báo lỗi

      setTimeout(() => {
        setSuccessMessage(""); // Xóa thông báo thành công sau 5 giây
      }, 5000);
    } else {
      setErrorMessage("Vui lòng điền đầy đủ tên và đánh giá!"); // Thông báo lỗi
      setSuccessMessage(""); // Xóa thông báo thành công
      setIsAnimating(true);

      setTimeout(() => {
        setIsAnimating(false);
        setErrorMessage(""); // Xóa thông báo lỗi sau 5 giây
      }, 5000);
    }
  };

  return (
    <>
      {/* Header cố định */}
      <header className="fixed top-0 left-0 w-full bg-green-500 text-white py-4 shadow-md z-50">
        <nav className="max-w-6xl mx-auto flex justify-between px-6">
          <h1 className="text-xl font-bold">Fruitables</h1>
          <ul className="flex gap-4">{/* <li>Giới Thiệu</li> */}</ul>
        </nav>
      </header>

      <div className="dg">
        <h1 className="text-2xl font-bold text-center mb-6">Đánh Giá Sản Phẩm</h1>

        <div className="khungdanhgia">
          {/* Form nhập đánh giá */}
          <form onSubmit={handleSubmit} className="sub">
            <input
              type="text"
              placeholder="Tên của bạn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />

            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="input"
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num} ⭐
                </option>
              ))}
            </select>

            <textarea
              placeholder="Nhập đánh giá..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="input-nhap"
              required
            />

            <button type="submit" className="input">
              Gửi đánh giá
            </button>
          </form>

           {/* Hiển thị thông báo thành công */}
{successMessage && (
  <div
    className={`${
      isAnimating ? "animate-pulse" : ""
    } text-green-600 bg-green-100 notification`}
  >
    {successMessage}
  </div>
)}

{/* Hiển thị thông báo lỗi */}
{errorMessage && (
  <div
    className={`${
      isAnimating ? "animate-pulse" : ""
    } text-green-600 bg-green-100 notification`}
  >
    {errorMessage}
  </div>
)}

          {/* Hiển thị đánh giá */}
          <div className="mt-6">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="bg-gray-100 p-3 mb-3 rounded">
                  <p className="font-bold">
                    {review.name} - {review.rating} ⭐
                  </p>
                  <p className="italic">{review.comment}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              ))
            ) : (
              <p className="thongbaodanhgia">Chưa có đánh giá nào.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
