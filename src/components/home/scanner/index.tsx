import { BarcodeScanner } from "./barcode";
import { useProduct } from "@/Context/productContext";



const Scanner=()=> {
  const { product } = useProduct();
  return (
    <>
        <p>Barcode Scanner</p>
      <main style={{ textAlign: "center", padding: "2rem" }}>
        <h1>📷 Barcode/QR Scanner</h1>
        <BarcodeScanner />
        {product && (
        <div className="max-w-xl mx-auto p-4 border rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-2">🍫 {product.productName}</h2>
      <p className="text-lg mb-4">Nutri-Score Grade: <strong className="text-red-600 uppercase">{product.nutriscore?.grade||""}</strong></p>
      <p className="mb-4">Total Score: <strong>{product.nutriscore?.score||""}</strong></p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-red-600">🔴 Negative Points</h3>
          <ul className="space-y-1">
            {product.nutriscore?.negative.map((item) => (
              <li key={item.id}>
                <strong>{item.id}:</strong> {item.value} {item.unit} – {item.points}/{item.points_max} points
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xl font-semibold mb-2 text-green-600">🟢 Positive Points</div>
          <ul className="space-y-1">
            {product.nutriscore?.positive.map((item) => (
              <li key={item.id}>
                <strong>{item.id}:</strong>{" "}
                {item.value !== null ? `${item.value} ${item.unit}` : "N/A"} – {item.points}/{item.points_max} points
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
      )}
      </main>
    </>
  );
}
export default Scanner;