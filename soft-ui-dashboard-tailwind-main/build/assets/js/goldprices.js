// goldPrices.js

const goldTypes = [
    { title: 'Çeyrek Altın', buyKey: 'quarterGoldAlis', sellKey: 'quarterGoldSatis', icon: 'money-coins' },
    { title: 'Yarım Altın', buyKey: 'halfGoldAlis', sellKey: 'halfGoldSatis', icon: 'money-coins' },
    { title: 'Tam Altın', buyKey: 'fullGoldAlis', sellKey: 'fullGoldSatis', icon: 'money-coins' },
    { title: 'Ham Altın', buyKey: 'goldBuy', sellKey: 'goldSell', icon: 'chart-bar-32' },
    { title: 'Gümüş', buyKey: 'silverBuy', sellKey: 'silverSell', icon: 'diamond' },
    { title: '22 Ayar Bilezik', buyKey: 'braceletAlis', sellKey: 'braceletSatis', icon: 'watch-time' },
    { title: 'Platin', buyKey: 'platinumBuy', sellKey: 'platinumSell', icon: 'badge' },
    { title: 'Paladyum', buyKey: 'palladiumBuy', sellKey: 'palladiumSell', icon: 'atom' }
];

function createGoldPriceCard(title, buyPrice, sellPrice, icon) {
    return `
    <div class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4 shadow">
      <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
        <div class="flex-auto p-4">
          <div class="flex flex-row -mx-3">
            <div class="flex-none w-2/3 max-w-full px-3">
              <div>
                <p class="mb-0 font-sans text-sm font-semibold leading-normal">${title}</p>
                <h5 class="mb-0 font-bold">
                  Alış: ${buyPrice} TL<br>
                  Satış: ${sellPrice} TL
                </h5>
              </div>
            </div>
            <div class="px-3 text-right basis-1/3">
              <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                <i class="ni leading-none ni-${icon} text-lg relative top-3.5 text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function updateGoldPrices() {
    const container = document.getElementById('goldPricesContainer');
    if (!container) {
        return;
    }

    fetch('http://185.93.70.34:3000/api/gold-price')
        .then(response => response.json())
        .then(data => {

            let htmlContent = '';
            goldTypes.forEach(type => {
                const buyPrice = data[type.buyKey] || 'Veri yok';
                const sellPrice = data[type.sellKey] || 'Veri yok';
                htmlContent += createGoldPriceCard(type.title, buyPrice, sellPrice, type.icon);
            });

            container.innerHTML = htmlContent;
        })
        .catch(error => {
            container.innerHTML = '<div class="w-full text-center text-red-500">Veri yüklenirken bir hata oluştu.</div>';
        });
}



// Sayfa yüklendiğinde hemen veri çek ve göster, sonra her 15 saniyede bir güncelle
updateGoldPrices();
setInterval(updateGoldPrices, 5000); // 15 saniyede bir güncelle

