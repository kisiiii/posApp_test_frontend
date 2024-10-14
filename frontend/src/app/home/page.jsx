"use client";
import { useState } from 'react';
import BarcodeScanner from '../../components/BarcodeScanner';

export default function Home() {
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState('');
  const [cart, setCart] = useState([]);
  const [barcode, setBarcode] = useState('');

  //ボタンがクリックされたときに、カメラを起動してバーコードのスキャンを開始する
  const handleScanClick = () => {
    // ここでバーコードスキャンのためのカメラを起動するロジックを追加します
    // スキャンされたバーコード、商品名、価格のシミュレーション
    setBarcode('12345678901'); // 仮のバーコード
    setProductName('おーいお茶'); // 仮の商品名
    setPrice('150円'); // 仮の価格
  };

  //バーコードが検出された後、そのバーコード情報を使ってAPIを呼び出し、商品情報を取得する
  const handleBarcodeDetected = async (barcode) => {
    try {
      const res = await fetch(`/api/products/${barcode}`); // バーコードを使ってAPIからデータを取得
      const data = await res.json(); // APIから返ってきたデータをJSON形式に変換

      if (res.status === 200) {
        setProduct(data); // 商品が見つかった場合、商品情報を画面に表示
        setMessage('');
      } else {
        setProduct(null); // 見つからなかった場合、メッセージを表示
        setMessage('商品がマスタ未登録です');
      }
    } catch (error) {
      console.error('Error fetching product:', error); // エラーがあった場合の処理
      setMessage('商品データの取得に失敗しました');
    }
  };

  //スキャンされた商品を購入リストに追加し、その後入力フィールドをクリア
  const handleAddClick = () => {
    // 新しい商品を定義
    const newProduct = { 
      barcode,
      productName,
      price
    };
    // カートに商品を追加
    setCart([...cart, newProduct]);
     // フォームをクリア
    setBarcode('');
    setProductName('');
    setPrice('');
  };

  //購入完了のダミーロジックを実行します。ここでは、実際のAPI呼び出しを使って購入を確定する処理に置き換え
  const handlePurchaseClick = () => {
    // 購入を確定するロジックを追加します
    alert('購入が完了しました！');
  };

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <button onClick={handleScanClick} style={buttonStyle}>
        スキャン（カメラ）
      </button>
      </div>

      <BarcodeScanner onDetected={handleBarcodeDetected} />
      {product ? (
        <div>
          <h2>商品情報</h2>
          <p>名称: {product.name}</p>
          <p>コード: {product.code}</p>
          <p>単価: {product.price}</p>
        </div>
      ) : (
        <p>{message}</p>
      )}

      <button onClick={handleAddClick} style={buttonStyle}>
        追加
      </button>
      
      <h3>購入リスト</h3>
      <div style={listStyle}>
        {cart.map((item, index) => (
          <div key={index} style={{ marginBottom: '5px' }}>
            {item.productName} x1 {item.price}
          </div>
        ))}
      </div>

      <button onClick={handlePurchaseClick} style={buttonStyle}>
        購入
      </button>

    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#ADD8E6',
  padding: '10px 20px',
  margin: '10px 0',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px'
};

const inputStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  margin: '10px 0',
  width: '200px',
  display: 'inline-block'
};

const listStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  width: '300px',
  margin: '10px auto',
  textAlign: 'left'
};
