const inventoryBody = document.getElementById("inventoryBody");
const messageText = document.getElementById("messageText");

// メッセージ表示（共通）
function showMessage(text) {
  messageText.textContent = text;
}

// 在庫数セルの色を更新（任意：簡単に視覚化）
function updateStockStyle(stockEl) {
  const stock = Number(stockEl.textContent);

  stockEl.style.color = ""; // リセット
  if (stock <= 0) stockEl.style.color = "red";
  else if (stock <= 5) stockEl.style.color = "orange";
}

// テーブル内のボタン操作（イベント委譲）
inventoryBody.addEventListener("click", (e) => {
  const btn = e.target.closest(".action-btn");
  if (!btn) return;

  const row = btn.closest("tr");
  const name = row.querySelector(".name")?.textContent ?? "商品";
  const stockEl = row.querySelector(".stock");
  const action = btn.dataset.action;

  if (!stockEl) return;

  if (action === "out") {
    // 出庫：在庫を1減らす（0未満にはしない）
    const current = Number(stockEl.textContent);
    if (current <= 0) {
      showMessage(`${name} は在庫がありません（出庫できません）`);
      updateStockStyle(stockEl);
      return;
    }
    stockEl.textContent = String(current - 1);
    updateStockStyle(stockEl);

    if (current - 1 <= 5) {
      showMessage(`${name} の在庫が少なくなりました（残り ${current - 1}）`);
    } else {
      showMessage(`${name} を出庫しました（残り ${current - 1}）`);
    }
    return;
  }

  if (action === "order") {
    // 発注：メッセージ表示（実際の発注処理は将来）
    const current = Number(stockEl.textContent);
    showMessage(`${name} を発注依頼しました（現在の在庫 ${current}）`);
    return;
  }
});

// 初期表示の色更新（任意）
document.querySelectorAll(".stock").forEach(updateStockStyle);
