(function (window, document) {
  "use strict";

  // Configuration
  const staticConfig = {
    baseUrl: "https://backend.ziadah.app/api/v1/zid",
    storeUuid: "c6e9b54f-60d1-4d10-9349-3edac4ac130d",
    // storeUuid: "b5f1b84b-9394-49d2-8ee8-c93bc24c9a28",
    // storeUuid: "3f1bde19-5349-4efc-b31f-5bac01ce0bee",
  };

  // Mocking API to fetch settings
  async function fetchStylingConfigFromAPI() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          mainFrameColor: "#ede8ed",
          mainColor: "#230476",
          subColor: "#3c871c",
          borderRadius: "3px",
          buttonShape: "outline",
        });
      }, 300);
    });
  }

  let config;

  // Initialize configuration
  async function initConfig() {
    try {
      const stylingConfig = await fetchStylingConfigFromAPI();
      config = {
        ...staticConfig,
        ...stylingConfig,
      };
      console.log("Configuration loaded:", config);
    } catch (error) {
      console.error("Error loading styling configuration:", error);

      config = {
        ...staticConfig,
        mainFrameColor: "#ffffff",
        mainColor: "#000000",
        subColor: "#333333",
        borderRadius: "0px",
        buttonShape: "fill",
      };
    }
  }

  // State management
  let state;
  function initState() {
    state = {
      currentLanguage: util.getLang(),
      cart: {
        products: [],
        productsCount: 0,
      },
    };
  }

  function getState() {
    if (!state) {
      initState();
    }
    return state;
  }

  // Translations
  const translations = {
    en: {
      language: "Language:",
      title: "Campaign Test",
      "trigger-events": "Trigger Events",
      "main-event": "Trigger Main Event",
      "view-product": "View Product",
      "add-remove-cart": "Add/Remove from Cart",
      "leave-product-page": "Leave Product Page",
      "start-checkout": "Start Checkout",
      purchase: "Purchase",
      "cart-actions": "Cart Actions",
      "add-to-cart": "Add to Cart",
      "remove-from-cart": "Remove from Cart",
      cart: "Cart",
      items: "items",
      price: "Price",
      "coupon-code": "Coupon Code",
      continue: "Continue shopping",
      replace: "Replace",
      "add-them-all": "Add them all",
      discount: "Discount",
      "coupon-valid": "Valid until",
      "free-shipping": "Free Shipping",
      "cash-on-delivery": "Cash on Delivery",
      "copy-coupon": "Copy Coupon",
      "coupon-copied": "Coupon code copied to clipboard!",
      "no-products-checkout": "No products available for checkout campaign.",
      "campaign-notification": "Campaign Notification",
      "no-campaign": "No campaign found for this event.",
      "api-error": "Error fetching campaign data.",
      "general-error": "An error occurred while processing the campaign.",
      coupon: "Coupon",
      "no-expiry": "No expiry date",
      "cart-empty": "The cart is already empty",
      "product-removed": "Product removed from cart",
      "remove-error": "Error removing product from cart",
      "product-added": "Product added to cart",
      "add-error": "Error adding product to cart",

      select_variant: "Select Variant",
      no_variants: "No variants available",

      "published-date": "Published Date",
      "limited-quantity": "Limited Quantity",
    },
    ar: {
      language: "اللغة:",
      title: "اختبار الحملة",
      "trigger-events": "تشغيل الأحداث",
      "main-event": "تشغيل الحدث الرئيسي",
      "view-product": "عرض المنتج",
      "add-remove-cart": "إضافة/إزالة من السلة",
      "leave-product-page": "مغادرة صفحة المنتج",
      "start-checkout": "بدء الدفع",
      purchase: "شراء",
      "cart-actions": "إجراءات السلة",
      "add-to-cart": "أضف إلى السلة",
      "remove-from-cart": "إزالة من السلة",
      cart: "السلة",
      items: "منتجات",
      price: "السعر",
      "coupon-code": "رمز القسيمة",
      continue: "أكمل التسوق",
      replace: "استبدال",
      "add-them-all": "أضف الجميع",
      discount: "الخصم",
      "coupon-valid": "صالح حتى",
      "free-shipping": "شحن مجاني",
      "cash-on-delivery": "الدفع عند الاستلام",
      "copy-coupon": "نسخ القسيمة",
      "coupon-copied": "تم نسخ رمز القسيمة إلى الحافظة!",
      "no-products-checkout": "لا توجد منتجات متاحة لحملة الدفع.",
      "campaign-notification": "إشعار الحملة",
      "no-campaign": "لم يتم العثور على حملة لهذا الحدث.",
      "api-error": "خطأ في جلب بيانات الحملة.",
      "general-error": "حدث خطأ أثناء معالجة الحملة.",
      coupon: "قسيمة",
      "no-expiry": "لا يوجد تاريخ انتهاء",
      "cart-empty": "السلة فارغة بالفعل",
      "product-removed": "تمت إزالة المنتج من السلة",
      "remove-error": "خطأ في إزالة المنتج من السلة",
      "product-added": "تمت إضافة المنتج إلى السلة",
      "add-error": "خطأ في إضافة المنتج إلى السلة",

      select_variant: "اختر البديل",
      no_variants: "لا تتوفر بدائل",

      "published-date": "تاريخ النشر",
      "limited-quantity": "الكمية المحدودة",
    },
  };

  // Utility functions
  const util = {
    getLang() {
      const htmlLang = document.documentElement.lang;
      return htmlLang &&
        (htmlLang.toLowerCase() === "ar" ||
          htmlLang.toLowerCase().startsWith("ar-"))
        ? "ar"
        : "en";
    },
    t(key) {
      const state = getState();
      return translations[state.currentLanguage][key] || key;
    },
    async fetchFromAPI(url) {
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error("Error fetching from API:", error);
        throw error;
      }
    },
    detectPageFont() {
      const bodyFont = window
        .getComputedStyle(document.body)
        .getPropertyValue("font-family");
      return bodyFont !== "none" ? bodyFont : "Arial, sans-serif";
    },

    async fetchVariantsForProducts(productId, selectedValues = []) {
      try {
        const state = getState();
        const payload = {
          product_id: productId,
          lang: state.currentLanguage,
          // names: selectedValues,
          names: selectedValues.length > 0 ? selectedValues : ["default"],
        };
        console.log("Variant API Payload:", payload);

        const response = await fetch(`${config.baseUrl}/store-front/variant`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Variant API Error Response:", errorText);
          return [];
        }

        const responseData = await response.json();

        if (responseData.is_success && responseData.data.length > 0) {
          return responseData.data;
        } else {
          console.log("No variants found for product:", productId);
          return [];
        }
      } catch (error) {
        console.log(
          "Error fetching product variants (assuming no variants):",
          error
        );
        return [];
      }
    },

    async testVariantFetch(productId) {
      const attributeNames = ["size", "color"];
      try {
        const state = getState();
        const payload = {
          product_id: productId,
          lang: state.currentLanguage,
          names: attributeNames,
        };
        console.log("Test Variant API Payload:", payload);

        const response = await fetch(`${config.baseUrl}/store-front/variant`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.log(`HTTP error! status: ${response.status}`);
          return `Error: ${response.status}`;
        }

        const responseData = await response.json();
        console.log("Test Variant API Response:", responseData);

        if (responseData.is_success && responseData.data.length > 0) {
          return `Variants found: ${responseData.data.length}`;
        } else {
          return "No variants found";
        }
      } catch (error) {
        console.error("Error in test variant fetch:", error);
        return `Error: ${error.message}`;
      }
    },
  };

  // DOM manipulation
  const dom = {
    updateUI() {
      document.querySelectorAll("[data-translate]").forEach((element) => {
        const key = element.getAttribute("data-translate");
        element.textContent = util.t(key);
      });
      this.updateCartInfo();
    },
    updateCartInfo() {
      const cartInfo = document.getElementById("cart-info");
      if (cartInfo) {
        const state = getState();
        cartInfo.innerHTML = `<i class="bi bi-cart me-2"></i>${util.t(
          "cart"
        )}: ${state.cart.productsCount} ${util.t("items")}`;
      }
    },
    getColorWithOpacity(hexColor, opacity) {
      hexColor = hexColor.replace("#", "");
      const r = parseInt(hexColor.substring(0, 2), 16);
      const g = parseInt(hexColor.substring(2, 4), 16);
      const b = parseInt(hexColor.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    },
    async createModal(
      products,
      triggers,
      couponData,
      type,
      card,
      alterProducts,
      isAlter,
      cartAddedProduct,
      limitation
    ) {
      const hash = Math.random().toString(36).substring(7);
      const prefix = "ziadah_";
      const classes = {
        modal: `${prefix}modal_${hash}`,
        modalOverlay: `${prefix}modal-overlay_${hash}`,
        modalContainer: `${prefix}modal-container_${hash}`,
        modalCloseBtn: `${prefix}modal-close-btn_${hash}`,
        modalHeader: `${prefix}modal-header_${hash}`,
        modalBody: `${prefix}modal-body_${hash}`,
        modalFooter: `${prefix}modal-footer_${hash}`,
        btn: `${prefix}btn_${hash}`,
        btnPrimary: `${prefix}btn-primary_${hash}`,
        btnSecondary: `${prefix}btn-secondary_${hash}`,
        productGrid: `${prefix}product-grid_${hash}`,
        productCard: `${prefix}product-card_${hash}`,
        quantityControl: `${prefix}quantity-control_${hash}`,
        quantityBtn: `${prefix}quantity-btn_${hash}`,
        quantityInput: `${prefix}quantity-input_${hash}`,

        addToCartBtn: `${prefix}add-to-cart-btn_${hash}`,
        // quantityControl: `${prefix}quantity-control_${hash}`,
        // quantityBtn: `${prefix}quantity-btn_${hash}`,
        // quantityInput: `${prefix}quantity-input_${hash}`,
        addToCartText: `${prefix}add-to-cart-text_${hash}`,
      };

      //const selectedAttributes = ["size", "color"];

      const variantsPromises = products.map((product) => {
        if (!product.uuid) {
          console.error("Product UUID is missing:", product);
          return Promise.resolve([]);
        }
        return util.fetchVariantsForProducts(product.uuid, []);
      });
      const variantsResults = await Promise.all(variantsPromises);

      const productCards = products.map((product, index) =>
        this.createProductCard(
          product,
          type,
          classes,
          prefix,
          hash,
          variantsResults[index]
        )
      );

      const modalEl = document.createElement("div");
      modalEl.id = `${prefix}modal-wrapper_${hash}`;
      const shadowRoot = modalEl.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = `

          <style>
              #${prefix}modal-wrapper_${hash} {
                  font-family: ${util.detectPageFont()};
              }
              .${classes.modalOverlay} {
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background-color: rgba(0, 0, 0, 0.5);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  z-index: 9999;
              }
  .${classes.modalContainer} {
            background-color: ${config.mainFrameColor};
            padding: 20px;
            border-radius: ${config.borderRadius};
            max-width: 90%;
            width: 800px; /* Increased width to accommodate multiple products */
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .${classes.productGrid} {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            gap: 15px;
            padding-bottom: 15px; /* Add some padding for the scrollbar */
        }
        .${classes.productCard} {
            flex: 0 0 auto;
            width: 200px; /* Fixed width for each product card */
            border: 1px solid #e0e0e0;
            border-radius: ${config.borderRadius};
            padding: 10px;
            display: flex;
            flex-direction: column;
        }
        .${classes.productCard} img {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: ${config.borderRadius};
            margin-bottom: 10px;
        }
        .${classes.quantityControl} {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .${classes.quantityInput} {
            width: 40px;
            text-align: center;
        }
            .${classes.btnIcon} {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}
.${classes.btn} {
  display: flex;
    align-items: center;
    justify-content: center;
            width: 100%;
            padding: 8px;
            border: none;
            border-radius: ${config.borderRadius};
            cursor: pointer;
            font-size: 0.9rem;
            ${
              config.buttonShape === "outline"
                ? `border: 2px solid ${config.mainColor}; background-color: transparent; color: ${config.mainColor};`
                : `background-color: ${config.mainColor}; color: #fff;`
            }
        }
        .${classes.btnPrimary} {
            ${
              config.buttonShape === "outline"
                ? `border-color: ${config.mainColor}; color: ${config.mainColor};`
                : `background-color: ${config.mainColor}; color: #fff;`
            }
        }
        .${classes.btnSecondary} {
            background-color: transparent;
            color: ${config.mainColor};
            border: 2px solid ${config.subColor};
        }
        .${classes.modalFooter} {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
        .${classes.modalFooter} .${classes.btn} {
            width: 48%;
        }
              .${classes.variantControl} {
                margin-bottom: 10px;
              }
              .${classes.variantSelect} {
                width: 100%;
                padding: 5px;
                border-radius: ${config.borderRadius};
              }
      .${classes.addToCartBtn} {
      display: flex;
      align-items: center;
      background-color: ${config.mainColor};
      border: none;
      border-radius: 25px;
      color: white;
      padding: 5px;
      cursor: pointer;
      font-size: 0.9rem;
      width: 100%;
      margin-bottom: 10px;
    }
    .${classes.quantityControl} {
      display: flex;
      align-items: center;
      background-color: ${this.getColorWithOpacity(config.mainFrameColor, 0.2)};
      border-radius: 20px;
      padding: 2px 5px;
      margin-right: 10px;
    }
    .${classes.quantityBtn} {
      background-color: transparent;
      border: none;
      color: white;
      font-size: 1.2rem;
      padding: 0 5px;
      cursor: pointer;
    }
    .${classes.quantityInput} {
      background-color: transparent;
      border: none;
      color: white;
      font-size: 1rem;
      text-align: center;
      width: 30px;
      -moz-appearance: textfield;
    }
    .${classes.quantityInput}::-webkit-inner-spin-button,
    .${classes.quantityInput}::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .${classes.addToCartText} {
      flex-grow: 1;
      text-align: center;
    }
          </style>
          <div class="${classes.modalOverlay}">
              <div class="${classes.modalContainer}">
                  <div class="${classes.modalHeader}">
                      <h3>${
                        card && card.title
                          ? card.title[state.currentLanguage] || ""
                          : ""
                      }</h3>
                      <button class="${classes.modalCloseBtn}">&times;</button>
                  </div>
                  <div class="${classes.modalBody}">
                      <p>${
                        card && card.description
                          ? card.description[state.currentLanguage] || ""
                          : ""
                      }</p>
                      ${
                        couponData.has_coupon
                          ? this.getCoupon(couponData, classes, prefix, hash)
                          : ""
                      }
                      <div class="${classes.productGrid}">
                       ${productCards.join("")}
                         
                      </div>
                  </div>
                  <div class="${classes.modalFooter}">
                      ${
                        type !== 1 ||
                        (Array.isArray(products) && products.length == 1)
                          ? `<button type="button" class="${classes.btn} ${
                              classes.btnPrimary
                            } ${prefix}add-all_${hash}">

           

                
                              ${
                                type == 1
                                  ? util.t("replace")
                                  : type == 2 &&
                                    Array.isArray(products) &&
                                    products.length == 1
                                  ? util.t("add-to-cart")
                                  : util.t("add-them-all")
                              }
                          </button>`
                          : ""
                      }
                    <button type="button" class="${classes.btn} ${
        classes.btnSecondary
      } ${prefix}continue_${hash}">
                            ${util.t("continue")}


                        </button>
                  </div>
              </div>
          </div>
      `;

      document.body.appendChild(modalEl);

      // Event listeners
      shadowRoot
        .querySelector(`.${classes.modalCloseBtn}`)
        .addEventListener("click", () => modalEl.remove());
      shadowRoot
        .querySelector(`.${prefix}continue_${hash}`)
        .addEventListener("click", () => modalEl.remove());
      const addAllButton = shadowRoot.querySelector(
        `.${prefix}add-all_${hash}`
      );
      if (addAllButton) {
        addAllButton.addEventListener("click", () => {
          cart.addAllProducts(products, type);
          modalEl.remove();
        });
      }

      // Variant selection event listeners
      shadowRoot
        .querySelectorAll(`.${classes.variantSelect}`)
        .forEach((select) => {
          select.addEventListener("change", async function () {
            const productId = this.getAttribute("data-product-id");
            const attributeIndex = this.getAttribute("data-attribute-index");
            const value = this.value;

            const productCard = this.closest(`.${classes.productCard}`);
            if (productCard) {
              let selectedValues = JSON.parse(
                productCard.getAttribute("data-selected-values") || "[]"
              );
              selectedValues[attributeIndex] = value;
              productCard.setAttribute(
                "data-selected-values",
                JSON.stringify(selectedValues)
              );

              // Fetch new variants based on selected values
              const newVariants = await util.fetchVariantsForProducts(
                productId,
                selectedValues
              );

              // Update other dropdowns based on new variants
              updateVariantDropdowns(productCard, newVariants, selectedValues);
            }
          });
        });

      function updateVariantDropdowns(productCard, variants, selectedValues) {
        if (!variants || variants.length === 0) return;

        const selects = productCard.querySelectorAll(
          `.${classes.variantSelect}`
        );
        selects.forEach((select, index) => {
          if (index !== selectedValues.length - 1) {
            const attribute = Object.keys(variants[0].attributes)[index];
            const availableValues = new Set(
              variants.map((v) => v.attributes[attribute])
            );

            Array.from(select.options).forEach((option) => {
              if (option.value) {
                option.disabled = !availableValues.has(option.value);
              }
            });
          }
        });
      }

      shadowRoot
        .querySelectorAll(`.${prefix}add-to-cart_${hash}`)
        .forEach((btn) => {
          btn.addEventListener("click", function () {
            const productId = this.getAttribute("data-product-id");
            const productCard = this.closest(`.${classes.productCard}`);
            if (productCard) {
              const quantityInput = productCard.querySelector(
                `.${classes.quantityInput}[data-product-id="${productId}"]`
              );
              const quantity = parseInt(quantityInput.value) || 1;
              const selectedAttributes = JSON.parse(
                productCard.getAttribute("data-selected-attributes") || "{}"
              );

              cart.addProduct({ productId, quantity, selectedAttributes });
            }
          });
        });

      // Quantity control event listeners

      shadowRoot.querySelectorAll(`.${classes.quantityBtn}`).forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const productId = this.getAttribute("data-product-id");
          const productCard = this.closest(`.${classes.productCard}`);
          if (productCard) {
            const input = productCard.querySelector(
              `.${classes.quantityInput}[data-product-id="${productId}"]`
            );
            if (input) {
              let value = parseInt(input.value) || 1;
              if (this.classList.contains(`${classes.minusBtn}`)) {
                value = Math.max(1, value - 1);
              } else {
                value++;
              }
              input.value = value;

              input.dispatchEvent(new Event("input", { bubbles: true }));
            }
          }
        });
      });

      // Prevent default behavior of number input and update on change
      shadowRoot
        .querySelectorAll(`.${classes.quantityInput}`)
        .forEach((input) => {
          input.addEventListener("click", (e) => e.stopPropagation());
          input.addEventListener("input", function () {
            let value = parseInt(this.value) || 1;
            this.value = Math.max(1, value);
          });
        });

      // Prevent default behavior of number input
      shadowRoot
        .querySelectorAll(`.${classes.quantityInput}`)
        .forEach((input) => {
          input.addEventListener("click", (e) => e.stopPropagation());
        });

      // Add to cart event listener

      shadowRoot.querySelectorAll(`.${classes.addToCartBtn}`).forEach((btn) => {
        btn.addEventListener("click", function () {
          const productId = this.getAttribute("data-product-id");
          const quantityInput = this.querySelector(
            `.${classes.quantityInput}[data-product-id="${productId}"]`
          );
          const quantity = Math.max(1, parseInt(quantityInput.value) || 1);
          quantityInput.value = quantity; // Update the input value
          const selectedAttributes = JSON.parse(
            this.closest(`.${classes.productCard}`).getAttribute(
              "data-selected-attributes"
            ) || "{}"
          );

          cart.addProduct({ productId, quantity, selectedAttributes });
        });
      });

      shadowRoot
        .querySelector(`.${classes.modalOverlay}`)
        .addEventListener("click", (e) => {
          if (
            e.target === shadowRoot.querySelector(`.${classes.modalOverlay}`)
          ) {
            modalEl.remove();
          }
        });
    },

    createProductCard(product, type, classes, prefix, hash, variants) {
      if (!product) return "";

      const productId = product.uuid || Math.random().toString(36).substring(7);

      let variantsHtml = "";
      if (variants && variants.length > 0) {
        const attributes = Object.keys(variants[0].attributes);

        variantsHtml = attributes
          .map(
            (attribute, index) => `
          <div class="${classes.variantControl}">
            <label>${attribute}:</label>
            <select class="${
              classes.variantSelect
            }" data-attribute-index="${index}" data-product-id="${productId}">
              <option value="">${util.t("select_variant")}</option>
              ${[...new Set(variants.map((v) => v.attributes[attribute]))]
                .map((value) => `<option value="${value}">${value}</option>`)
                .join("")}
            </select>
          </div>
        `
          )
          .join("");
      } else {
        variantsHtml = `<p>${util.t("no_variants")}</p>`;
      }

      return `
      <div class="${classes.productCard}" data-product-id="${productId}">
          <img src="${
            product.images && product.images.length
              ? product.images[0].images.small
              : "https://placehold.co/370?text=Product"
          }" 
              alt="${
                product.name && product.name[state.currentLanguage]
                  ? product.name[state.currentLanguage]
                  : "Product"
              }">
          <h5 style="font-size:1rem; margin-bottom:5px; color:${
            config.subColor
          };">
              ${
                product.name && product.name[state.currentLanguage]
                  ? product.name[state.currentLanguage]
                  : "Product"
              }
          </h5>
          <p style="font-weight:bold; margin-bottom:10px; color:${
            config.subColor
          };">
              ${product.price || 0} ${product.currency || ""}
          </p>

          ${variantsHtml}

 <button class="${
   classes.addToCartBtn
 } ${prefix}add-to-cart_${hash}" data-product-id="${productId}">
        <div class="${classes.quantityControl}">
          <span class="${classes.quantityBtn} ${
        classes.minusBtn
      }" data-product-id="${productId}">-</span>
          <input type="number" class="${
            classes.quantityInput
          }" value="1" min="1" data-product-id="${productId}">
          <span class="${classes.quantityBtn} ${
        classes.plusBtn
      }" data-product-id="${productId}">+</span>
        </div>
        <span class="${classes.addToCartText}">
          ${type == 1 ? util.t("replace") : util.t("add-to-cart")}
        </span>
      </button>


      </div>
  `;
    },

    getCoupon(couponData, classes, prefix, hash) {
      if (!couponData || !couponData.has_coupon) {
        return "";
      }

      const { coupon, published_date, campaign_settings } = couponData;

      return `
        <div class="${prefix}coupon_${hash}" style="margin-bottom: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
          <h5 style="margin-bottom: 10px;">${util.t("coupon-code")}</h5>
          <div class="${
            classes.couponCode
          }" style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 1.2em; font-weight: bold;">${
              coupon ? coupon.code : "N/A"
            }</span>
            <button class="${classes.btn} ${
        classes.btnSecondary
      }" onclick="navigator.clipboard.writeText('${
        coupon ? coupon.code : ""
      }'); alert('${util.t("coupon-copied")}');" style="padding: 5px 10px;">
              ${util.t("copy-coupon")}
            </button>
          </div>
          ${
            published_date
              ? `<p style="margin-top: 10px; font-size: 0.9em;">${util.t(
                  "published-date"
                )}: ${published_date}</p>`
              : ""
          }
          ${
            campaign_settings && campaign_settings.is_limited_quantity
              ? `<p style="margin-top: 5px; font-size: 0.9em;">${util.t(
                  "limited-quantity"
                )}: ${campaign_settings.limited_quantity_value}</p>`
              : ""
          }
        </div>
      `;
    },

    showToast(message, duration = 3000) {
      let toastContainer = document.querySelector(".ziadah-toast-container");
      if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.className = "ziadah-toast-container";
        toastContainer.style.cssText = `
              position: fixed;
              top: 20px;
              right: 20px;
              z-index: 9999;
          `;
        document.body.appendChild(toastContainer);
      }

      const toast = document.createElement("div");
      toast.className = "ziadah-toast";
      toast.textContent = message;
      toast.style.cssText = `
          background-color: #333;
          color: #fff;
          padding: 12px 20px;
          border-radius: 4px;
          margin-top: 10px;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          max-width: 300px;
      `;

      toastContainer.appendChild(toast);

      //
      toast.offsetHeight;
      toast.style.opacity = "1";

      setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
          toastContainer.removeChild(toast);
          if (toastContainer.children.length === 0) {
            document.body.removeChild(toastContainer);
          }
        }, 300000);
      }, duration);
    },
  };
  const cart = {
    addProduct({ productId, quantity, selectedAttributes = {} }) {
      return new Promise(async (resolve, reject) => {
        try {
          console.log("Adding product:", {
            productId,
            quantity,
            selectedAttributes,
          });

          if (!productId) {
            throw new Error("Product ID is undefined or null");
          }

          const variants = await util.fetchVariantsForProducts(
            productId,
            Object.values(selectedAttributes)
          );

          console.log("Fetched variants:", variants);

          let variantId = productId;
          if (variants && variants.length > 0) {
            const matchingVariant = variants.find((variant) =>
              Object.entries(selectedAttributes).every(
                ([key, value]) => variant.attributes[key] === value
              )
            );
            if (matchingVariant) {
              variantId = matchingVariant.id;
            }
          }

          console.log("Selected variant ID:", variantId);

          const apiData = await util.fetchFromAPI(
            `${config.baseUrl}/store-events?store-id=${config.storeUuid}&event-id=4`
          );
          console.log("API Data:", apiData);

          if (!apiData.data || !Array.isArray(apiData.data)) {
            throw new Error("Invalid API response data");
          }

          const product = apiData.data
            .flatMap((campaign) => campaign.action_products || [])
            .find((p) => p.uuid === productId);

          console.log("Found product:", product);

          if (product) {
            state.cart.products.push({ ...product, quantity });
            state.cart.productsCount += quantity;
            dom.updateCartInfo();
            dom.showToast(util.t("product-added"));
            resolve({ status: "success", data: { cart: state.cart } });
          } else {
            throw new Error("Product not found");
          }
        } catch (error) {
          console.error("Error adding product to cart:", error);
          console.error("Error details:", error.message);
          console.error("Stack trace:", error.stack);
          dom.showToast(util.t("add-error"));
          reject(error);
        }
      });
    },

    removeProduct(productId) {
      return new Promise((resolve, reject) => {
        if (state.cart.productsCount === 0) {
          dom.showToast(util.t("cart-empty"));
          reject(new Error("Cart is empty"));
          return;
        }

        const index = state.cart.products.findIndex(
          (p) => p.uuid === productId
        );
        if (index !== -1) {
          const removedQuantity = state.cart.products[index].quantity;
          state.cart.products.splice(index, 1);
          state.cart.productsCount -= removedQuantity;
          dom.updateCartInfo();
          dom.showToast(util.t("product-removed"));
          resolve({ data: { cart: state.cart } });
        } else {
          dom.showToast(util.t("remove-error"));
          reject(new Error("Product not found in cart"));
        }
      });
    },

    addAllProducts(products, type) {
      const promises = products.map((product) =>
        this.addProduct({ productId: product.uuid, quantity: 1 })
      );
      Promise.all(promises)
        .then(() => {
          dom.showToast(
            util.t(type == 1 ? "replaced_all" : "added_all_to_cart")
          );
        })
        .catch((error) => {
          console.error("Error adding all products:", error);
          dom.showToast(util.t("add-error"));
        });
    },
  };

  const campaign = {
    async trigger(eventId, eventName, eventCallBack) {
      if (window.zidPlugin === true) return;
      window.zidPlugin = true;

      console.log(
        `Campaign triggered: Event ID ${eventId}, Event Name: ${eventName}`
      );

      try {
        console.log(`Fetching data from API for event ID: ${eventId}`);
        const apiData = await util.fetchFromAPI(
          `${config.baseUrl}/store-events?store-id=${config.storeUuid}&event-id=${eventId}`
        );
        console.log("API Response:", apiData);

        if (apiData.is_success) {
          if (apiData.data && apiData.data.length > 0) {
            const highestPriorityCampaign = apiData.data.reduce(
              (prev, current) =>
                current.priority < prev.priority ? current : prev
            );

            console.log("Highest Priority Campaign:", highestPriorityCampaign);

            if (
              highestPriorityCampaign.action_products &&
              highestPriorityCampaign.action_products.length === 0 &&
              eventName === "start-checkout"
            ) {
              console.log("No products for checkout campaign. Showing toast.");
              dom.showToast(util.t("no-products-checkout"));
            } else {
              console.log("Creating modal for campaign");
              dom.createModal(
                highestPriorityCampaign.action_products || [],
                highestPriorityCampaign.trigger_products || [],
                {
                  has_coupon: highestPriorityCampaign.is_product_coupon_enabled,
                  coupon: highestPriorityCampaign.coupon,
                  published_date: highestPriorityCampaign.published_date,
                  campaign_settings: highestPriorityCampaign.campaign_settings,
                },
                highestPriorityCampaign.type.id,
                highestPriorityCampaign.card,
                highestPriorityCampaign.alternative_products || [],
                highestPriorityCampaign.is_alternative_product_enabled,
                eventName === "add-remove-cart" ? eventCallBack.id : null
              );
            }
          } else {
            console.log("No campaigns found for this event");
            dom.showToast(util.t("no-campaign"));
          }
        } else {
          console.error("API request was not successful");
          dom.showToast(util.t("api-error"));
        }
      } catch (error) {
        console.error("Error in campaign function:", error);
        dom.showToast(util.t("general-error"));
      } finally {
        window.zidPlugin = false;
      }
    },
  };

  // Public API
  window.ZiadahPlugin = {
    async init() {
      await initConfig();
      initState();
      dom.updateUI();
      this.setupEventListeners();
    },

    setupEventListeners() {
      // Event listener for language switcher
      const languageSelect = document.getElementById("language-select");
      if (languageSelect) {
        languageSelect.addEventListener("change", (e) => {
          this.changeLanguage(e.target.value);
        });
      }

      // Event listeners for trigger event buttons
      const triggerButtons = document.querySelectorAll("[data-event-id]");
      triggerButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const eventId = button.getAttribute("data-event-id");
          const eventName = button.getAttribute("data-event-name");
          const eventData = JSON.parse(
            button.getAttribute("data-event-data") || "{}"
          );
          this.triggerEvent(eventId, eventName, eventData);
        });
      });

      // Event listener for "Add to Cart" button
      document.body.addEventListener("click", (e) => {
        if (e.target.matches('[data-action="add-to-cart"]')) {
          e.preventDefault();
          const productId = e.target.getAttribute("data-product-id");
          const quantity = parseInt(
            e.target.getAttribute("data-quantity") || "1",
            10
          );
          cart.addProduct({ productId, quantity });
        }
      });

      // Event listener for "Remove from Cart" button
      document.body.addEventListener("click", (e) => {
        if (e.target.matches('[data-action="remove-from-cart"]')) {
          e.preventDefault();
          const productId = e.target.getAttribute("data-product-id");
          cart.removeProduct(productId);
        }
      });

      // Event delegation for quantity controls in modal
      document.body.addEventListener("click", (e) => {
        if (e.target.matches(".ziadah_quantity-btn")) {
          const input = e.target
            .closest(".ziadah_quantity-control")
            .querySelector(".ziadah_quantity-input");
          let value = parseInt(input.value, 10);
          if (e.target.classList.contains("ziadah_minus-btn")) {
            value = Math.max(1, value - 1);
          } else {
            value++;
          }
          input.value = value;
        }
      });

      // Event listener for modal close button
      document.body.addEventListener("click", (e) => {
        if (e.target.matches(".ziadah_modal-close-btn")) {
          const modal = e.target.closest(".ziadah_modal-overlay");
          if (modal) {
            modal.remove();
          }
        }
      });

      // Event listener for modal overlay click (to close modal)
      document.body.addEventListener("click", (e) => {
        if (e.target.matches(".ziadah_modal-overlay")) {
          e.target.remove();
        }
      });
    },
    changeLanguage(lang) {
      const state = getState();
      state.currentLanguage = lang;
      dom.updateUI();
    },

    triggerEvent(eventId, eventName, eventData) {
      campaign.trigger(eventId, eventName, eventData);
    },

    testProductVariants(productId, attributeNames = []) {
      util.testVariantFetch(productId, attributeNames).then((result) => {
        console.log(`Test result for product ${productId}:`, result);
      });
    },

    getLang: util.getLang,
  };

  // Initialize on DOM content loaded
  document.addEventListener("DOMContentLoaded", () => {
    window.ZiadahPlugin.init();
  });
})(window, document);
