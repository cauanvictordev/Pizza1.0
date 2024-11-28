// ===========================
// Seletores Principais
// ===========================
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeModalBtn = document.getElementById("close-modal-btn");
const menu = document.querySelector(".menu");
const cartBtn = document.getElementById("cart-btn");
const cartCount = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const checkoutBtn = document.getElementById("checkout-btn");
const customerNameInput = document.getElementById("customer-name");
const paymentProofInput = document.getElementById("payment-proof");
const paymentInfo = document.getElementById("payment-info");
const pixInfo = document.getElementById("pix-info");
const copyPixBtn = document.getElementById("copy-pix-btn");
const pixKey = document.getElementById("pix-key");

// ===========================
// Estado do Carrinho
// ===========================
let cart = []; // Array que armazena os itens adicionados ao carrinho

// ===========================
// Exibição do Modal do Carrinho
// ===========================
cartBtn.addEventListener("click", () => {
  cartModal.classList.add("active");
  cartModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  cartModal.classList.remove("active");
  cartModal.style.display = "none";
});

// ===========================
// Adicionar Item ao Carrinho
// ===========================
menu.addEventListener("click", (event) => {
  const parentButton = event.target.closest(".add-to-cart-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));
    const imageSrc = parentButton.querySelector("img").getAttribute("src");
    addToCart(name, price, imageSrc);
  }
});

function addToCart(name, price, imageSrc) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1, imageSrc });
  }

  updateCartModal();
}

// ===========================
// Atualização do Modal do Carrinho
// ===========================
function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");

    cartItemElement.innerHTML = `
      <img src="${item.imageSrc}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <p><strong>Produto:</strong> ${item.name}</p>
        <p><strong>Quantidade:</strong> ${item.quantity}</p>
        <p><strong>Preço:</strong> R$ ${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button class="remove-from-cart-btn" data-index="${index}">
        <i class="fas fa-trash-alt"></i> Remover
      </button>
    `;

    cartItemsContainer.appendChild(cartItemElement);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `R$ ${total.toFixed(2)}`;
  updateCartCount();
}

// ===========================
// Remover Item do Carrinho
// ===========================
cartItemsContainer.addEventListener("click", (event) => {
  if (event.target.closest(".remove-from-cart-btn")) {
    const index = parseInt(event.target.closest(".remove-from-cart-btn").getAttribute("data-index"));
    cart.splice(index, 1);
    updateCartModal();
  }
});

// ===========================
// Finalizar Compra
// ===========================
checkoutBtn.addEventListener("click", () => {
  const name = customerNameInput.value.trim();
  const address = addressInput.value.trim();
  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
  const total = cartTotal.textContent;

  if (!name || !address || !paymentMethod) {
    alert("Por favor, preencha todas as informações.");
    return;
  }

  const cartItems = cart
    .map(
      (item) =>
        `${item.name} - Quantidade: ${item.quantity} - Preço: R$ ${(item.price * item.quantity).toFixed(2)}`
    )
    .join("\n");

  let message = `Olá, segue o pedido:\n\n` +
    `Nome: ${name}\n` +
    `Endereço: ${address}\n` +
    `Forma de Pagamento: ${paymentMethod}\n` +
    `Total: ${total}\n\n` +
    `Produtos:\n${cartItems}\n`;

  if (paymentMethod === "PIX") {
    alert("Você selecionou PIX como forma de pagamento. Por favor, envie o comprovante manualmente na conversa do WhatsApp após abrir o link.");
    message += "\nPor favor, envie o comprovante de pagamento nesta conversa.";
  }

  const whatsappLink = `https://wa.me/67996123728?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, "_blank");

  cart = [];
  addressInput.value = "";
  customerNameInput.value = "";
  updateCartModal();
});

// ===========================
// Atualizar Contador do Carrinho
// ===========================
function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = count;
}

// ===========================
// Forma de Pagamento - PIX
// ===========================
copyPixBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(pixKey.textContent).then(() => {
    alert("Chave Pix copiada para a área de transferência!");
  }).catch(() => {
    alert("Falha ao copiar a chave Pix. Por favor, copie manualmente.");
  });
});

document.querySelectorAll('input[name="payment"]').forEach((radio) => {
  radio.addEventListener("change", handlePaymentMethodChange);
});

function handlePaymentMethodChange() {
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

  if (paymentMethod === "pix") {
    pixInfo.classList.remove("hidden");
  } else {
    pixInfo.classList.add("hidden");
  }
}














// ===========================
// <!-- CARROSSEL -->
// ===========================


document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const carouselImages = document.querySelector(".carousel-images");
  const images = document.querySelectorAll(".carousel-image");

  let currentIndex = 0;

  const updateCarousel = () => {
      const offset = -currentIndex * 100; // Move para a próxima imagem (100% por imagem)
      carouselImages.style.transform = `translateX(${offset}%)`;
  };

  prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length; // Vai para a imagem anterior
      updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length; // Vai para a próxima imagem
      updateCarousel();
  });

  // Inicializa o carrossel
  updateCarousel();
});