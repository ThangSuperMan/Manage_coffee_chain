if Doorkeeper::Application.count.zero?
  Doorkeeper::Application.create!(name: 'IOS client', redirect_uri: '', scopes: '')
  Doorkeeper::Application.create!(name: 'Android client', redirect_uri: '', scopes: '')
  Doorkeeper::Application.create!(name: 'React', uid: 'coffee_website', redirect_uri: '', scopes: '')
end

if Bookmark.count.zero?
  Bookmark.create(title: 'Google', url: 'https://www.google.com')
  Bookmark.create(title: 'Youtube', url: 'https://youube.com')
end

if User.count.zero?
  User.create!(email: 'admin@gmail.com', password: 'admin123', role: 'superadmin')
end

if Category.count.zero?
  categories = [
    {
      name: "Cà phê",
      slug: "ca-phe"
    },
    {
      name: "Trà",
      slug: "tra-trai-cay-tra-sua"
    },
    {
      name: "Cloud",
      slug: "cloud"
    },
    {
      name: "Hi-Teach Healthy",
      slug: "hi-tea-healthy"
    },
    {
      name: "Bánh & Snack",
      slug: "banh"
    },
  ]

  categories.each do |category|
    Category.create!(category)
  end

  category_coffee = Category.find_by(slug: 'ca-phe')
  category_tea = Category.find_by(slug: 'tra-trai-cay-tra-sua')
  category_cloud = Category.find_by(slug: 'cloud')
  category_hi_tea_healthy = Category.find_by(slug: 'hi-tea-healthy')
  category_snack = Category.find_by(slug: 'banh')

  subcategories = [
    # Coffee
    {
      category: category_coffee,
      name: "Cà Phê Highlight",
      slug: "ca-phe-highlight"
    },
    {
      category: category_coffee,
      name: "Cà Phê Việt Nam",
      slug: "ca-phe-viet-nam"
    },
    {
      category: category_coffee,
      name: "Cà Phê Máy",
      slug: "ca-phe-may"
    },
    {
      category: category_coffee,
      name: "Cà phê",
      slug: "cold-brew"
    },

    # Tea
    {
      category: category_tea,
      name: "Trà trái cây",
      slug: "tra-trai-cay"
    },
    {
      category: category_tea,
      name: "Trà sữa Macchiato",
      slug: "tra-sua-macchiato"
    },

    # Cloud
    {
      category: category_cloud,
      name: "CloudTea",
      slug: "cloudtea"
    },
    {
      category: category_cloud,
      name: "CloudFee",
      slug: "cloudfee"
    },

    # Hi-Teach Healthy
    {
      category: category_hi_tea_healthy,
      name: "Hi-Tea Trà",
      slug: "hi-tea-tra"
    },
    {
      category: category_hi_tea_healthy,
      name: "Hi-Tea Đá Tuyết",
      slug: "hi-tea-da-tuyet"
    },

    # Snack
    {
      category: category_snack,
      name: "Bánh mặn",
      slug: "banh-man"
    },
    {
      category: category_snack,
      name: "Bánh ngọt",
      slug: "banh-ngot"
    },
    {
      category: category_snack,
      name: "Snack",
      slug: "snack"
    },
  ]

  subcategories.each do |subcategory|
    Subcategory.create!(subcategory)
  end
end

if Product.count.zero?
  subcategory_highlight = Subcategory.find_by(slug: 'ca-phe-highlight')
  subcategory_vietnam = Subcategory.find_by(slug: 'ca-phe-viet-nam')
  subcategory_tra_trai_cay = Subcategory.find_by(slug: 'tra-trai-cay')
  subcategory_tra_sua_macchiato = Subcategory.find_by(slug: 'tra-sua-macchiato')
  subcategory_hi_tea_tra = Subcategory.find_by(slug: 'hi-tea-tra')
  subcategory_hi_tea_da_tuyet = Subcategory.find_by(slug: 'hi-tea-da-tuyet')
  subcategory_banh_man = Subcategory.find_by(slug: 'banh-man')
  subcategory_banh_ngot = Subcategory.find_by(slug: 'banh-ngot')
  subcategory_snack = Subcategory.find_by(slug: 'snack')

  # Highlight
  products = [
    {
      subcategory: subcategory_highlight,
      title: "Phin Sữa Tươi Bánh Flan",
      body: "Tỉnh tức thì cùng cà phê Robusta pha phin đậm đà và bánh flan núng nính. Uống là tỉnh, ăn là dính, xứng đáng là highlight trong ngày của bạn.",
      meta_title: "Phin Sữa Tươi Bánh Flan",
      slug: "phin-sua-tuoi-banh-flan",
      price: 49.000,
      image_url: "https://product.hstatic.net/1000075078/product/1696220170_phin-sua-tuoi-banh-flan_348e4d8886cc49cb968799018001c6fb.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 1.week,
    },
    {
      subcategory: subcategory_highlight,
      title: "Trà Xanh Espresso Marble",
      body: "Cho ngày thêm tươi, tỉnh, êm, mượt với Trà Xanh Espresso Marble. Đây là sự mai mối bất ngờ giữa trà xanh Tây Bắc vị mộc và cà phê Arabica Đà Lạt. Muốn ngày thêm chút highlight, nhớ tìm đến sự bất ngờ này bạn nhé!",
      meta_title: "Trà Xanh Espresso Marble",
      slug: "tra-xanh-espresso-marble",
      price: 49.000,
      image_url: "https://product.hstatic.net/1000075078/product/1696220139_tra-xanh-espresso-marble_492d249bb3ab498496bff16663d9649b.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },

    # Coffee vietnam
    {
      subcategory: subcategory_vietnam,
      title: "Đường Đen Sữa Đá",
      body: "Nếu chuộng vị cà phê đậm đà, bùng nổ và thích vị đường đen ngọt thơm, Đường Đen Sữa Đá đích thị là thức uống dành cho bạn. Không chỉ giúp bạn tỉnh táo buổi sáng, Đường Đen Sữa Đá còn hấp dẫn đến ngụm cuối cùng bởi thạch cà phê giòn dai, nhai cực cuốn. - Khuấy đều trước khi sử dụng",
      meta_title: "Đường Đen Sữa Đá",
      slug: "duong-den-sua-da",
      price: 45.000,
      image_url: "https://product.hstatic.net/1000075078/product/1686716532_dd-suada_4f2bf8d7f1af4f408500d6d85e150582.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_vietnam,
      title: "The Coffee House Sữa Đá",
      body: "Thức uống giúp tỉnh táo tức thì để bắt đầu ngày mới thật hứng khởi. Không đắng khét như cà phê truyền thống, The Coffee House Sữa Đá mang hương vị hài hoà đầy lôi cuốn. Là sự đậm đà của 100% cà phê Arabica Cầu Đất rang vừa tới, biến tấu tinh tế với sữa đặc và kem sữa ngọt ngào cực quyến rũ. Càng hấp dẫn hơn với topping thạch 100% cà phê nguyên chất giúp giữ trọn vị ngon đến ngụm cuối cùng.",
      meta_title: "Bạc Sỉu",
      slug: "the-coffee-house-sua-da",
      price: 35.000,
      image_url: "https://product.hstatic.net/1000075078/product/1675355354_bg-tch-sua-da-no_f3d8150a7b2744e68c7215ff13c0fe96.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_vietnam,
      title: "The Coffee House Sữa Đá",
      body: "Thức uống giúp tỉnh táo tức thì để bắt đầu ngày mới thật hứng khởi. Không đắng khét như cà phê truyền thống, The Coffee House Sữa Đá mang hương vị hài hoà đầy lôi cuốn. Là sự đậm đà của 100% cà phê Arabica Cầu Đất rang vừa tới, biến tấu tinh tế với sữa đặc và kem sữa ngọt ngào cực quyến rũ. Càng hấp dẫn hơn với topping thạch 100% cà phê nguyên chất giúp giữ trọn vị ngon đến ngụm cuối cùng.",
      meta_title: "Bạc Sỉu",
      slug: "the-coffee-house-sua-da",
      price: 35.000,
      image_url: "https://product.hstatic.net/1000075078/product/1675355354_bg-tch-sua-da-no_f3d8150a7b2744e68c7215ff13c0fe96.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_vietnam,
      title: "Cà Phê Sữa Đá",
      body: "Cà phê Đắk Lắk nguyên chất được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.",
      meta_title: "Cà Phê Sữa Đá",
      slug: "the-coffee-house-sua-da",
      price: 29.000,
      image_url: "https://product.hstatic.net/1000075078/product/1669736835_ca-phe-sua-da_841285ad62c2440fb7ab03a5b3b6404d.png",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_vietnam,
      title: "Cà Phê Sữa Nóng",
      body: "Cà phê được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.",
      meta_title: "Cà Phê Sữa Nóng",
      slug: "ca-phe-sua-nong",
      price: 39.000,
      image_url: "https://product.hstatic.net/1000075078/product/1639377770_cfsua-nong_8a83a7628b8b44839cb692c578b7c9b4.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_vietnam,
      title: "Bạc Sỉu",
      body: 'Bạc sỉu chính là "Ly sữa trắng kèm một chút cà phê". Thức uống này rất phù hợp những ai vừa muốn trải nghiệm chút vị đắng của cà phê vừa muốn thưởng thức vị ngọt béo ngậy từ sữa.',
      meta_title: "Bạc Sỉu",
      slug: "ca-phe-sua-nong",
      price: 29.000,
      image_url: "https://product.hstatic.net/1000075078/product/1639377904_bac-siu_2ec66781492d4bb0aa7acb48ef9a1742.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_vietnam,
      title: "Bạc Sữa Nóng",
      body: 'Bạc sỉu chính là "Ly sữa trắng kèm một chút cà phê". Thức uống này rất phù hợp những ai vừa muốn trải nghiệm chút vị đắng của cà phê vừa muốn thưởng thức vị ngọt béo ngậy từ sữa.',
      meta_title: "Bạc Sỉu Nóng",
      slug: "bac-siu-nong",
      price: 39.000,
      image_url: "https://product.hstatic.net/1000075078/product/1639377926_bacsiunong_3b30ddb6aeae4ce0b255bf3d3e4819f1.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_vietnam,
      title: "Đường Đen Marble Latte",
      body: 'Đường Đen Marble Latte êm dịu cực hấp dẫn bởi vị cà phê đắng nhẹ hoà quyện cùng vị đường đen ngọt thơm và sữa tươi béo mịn. Sự kết hợp đầy mới mẻ của cà phê và đường đen cũng tạo nên diện mạo phân tầng đẹp mắt. Đây là lựa chọn đáng thử để bạn khởi đầu ngày mới đầy hứng khởi. - Khuấy đều trước khi sử dụng',
      meta_title: "Bạc Sỉu Nóng",
      slug: "bac-siu-nong",
      price: 55.000,
      image_url: "https://product.hstatic.net/1000075078/product/1686716537_dd-latte_8c95c52adaba4e0d9a1c75cd5f740e9d.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_vietnam,
      title: "Caramel Macchiato Đá",
      body: 'Khuấy đều trước khi sử dụng Caramel Macchiato sẽ mang đến một sự ngạc nhiên thú vị khi vị thơm béo của bọt sữa, sữa tươi, vị đắng thanh thoát của cà phê Espresso hảo hạng và vị ngọt đậm của sốt caramel được gói gọn trong một tách cà phê.',
      meta_title: "Bạc Sỉu Nóng",
      slug: "caramel-macchiato-da",
      price: 55.000,
      image_url: "https://product.hstatic.net/1000075078/product/caramel-macchiato_143623_def76753869f42979203b0d65bac672e.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_vietnam,
      title: "Caramel Macchiato Đá",
      body: 'Khuấy đều trước khi sử dụng Caramel Macchiato sẽ mang đến một sự ngạc nhiên thú vị khi vị thơm béo của bọt sữa, sữa tươi, vị đắng thanh thoát của cà phê Espresso hảo hạng và vị ngọt đậm của sốt caramel được gói gọn trong một tách cà phê.',
      meta_title: "Caramel Macchiato Đá",
      slug: "caramel-macchiato-da",
      price: 55.000,
      image_url: "https://product.hstatic.net/1000075078/product/caramel-macchiato_143623_def76753869f42979203b0d65bac672e.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_vietnam,
      title: "Caramel Macchiato Nóng",
      body: 'Caramel Macchiato sẽ mang đến một sự ngạc nhiên thú vị khi vị thơm béo của bọt sữa, sữa tươi, vị đắng thanh thoát của cà phê Espresso hảo hạng và vị ngọt đậm của sốt caramel được gói gọn trong một tách cà phê.',
      meta_title: "Caramel Macchiato Nóng",
      slug: "caramel-macchiato-nong",
      price: 55.000,
      image_url: "https://product.hstatic.net/1000075078/product/caramelmacchiatonong_168039_9eec76d0e1e740da9d4c4d67562859c2.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },

    # Tea
    {
      subcategory: subcategory_tra_trai_cay,
      title: "Trà Long Nhãn Hạt Sen",
      body: 'Thức uống mang hương vị của nhãn, của sen, của trà Oolong đầy thanh mát cho tất cả các thành viên trong dịp Tết này. An lành, thư thái và đậm đà chính là những gì The Coffee House mong muốn gửi trao đến bạn và gia đình.',
      meta_title: "Trà Long Nhãn Hạt Sen",
      slug: "tra-long-nhan-hat-sen",
      price: 45.000,
      image_url: "https://product.hstatic.net/1000075078/product/1649378747_tra-sen-nhan_01472713cfef4b8fb7fb4a90efeadd39.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_tra_trai_cay,
      title: "Trà Đào Cam Sả Đá",
      body: 'Vị thanh ngọt của đào, vị chua dịu của Cam Vàng nguyên vỏ, vị chát của trà đen tươi được ủ mới mỗi 4 tiếng, cùng hương thơm nồng đặc trưng của sả chính là điểm sáng làm nên sức hấp dẫn của thức uống này.',
      meta_title: "Trà Đào Cam Sả - Đá",
      slug: "tra-dao-cam-sa-da",
      price: 49.000,
      image_url: "https://product.hstatic.net/1000075078/product/1669736819_tra-dao-cam-sa-da_008c04619f4642a6b95f882264155495_large.png",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_tra_trai_cay,
      title: "Trà Đào Cam Sả Nóng",
      body: 'Vị thanh ngọt của đào, vị chua dịu của Cam Vàng nguyên vỏ, vị chát của trà đen tươi được ủ mới mỗi 4 tiếng, cùng hương thơm nồng đặc trưng của sả chính là điểm sáng làm nên sức hấp dẫn của thức uống này.',
      meta_title: "Trà Đào Cam Sả - Nóng",
      slug: "tra-dao-cam-sa-nong",
      price: 59.000,
      image_url: "https://product.hstatic.net/1000075078/product/tdcs-nong_288997_53cde51f5e3247258068e08fd536b4c3.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_tra_trai_cay,
      title: "Trà Hạt Sen Đá",
      body: 'Nền trà oolong hảo hạng kết hợp cùng hạt sen tươi, bùi bùi và lớp foam cheese béo ngậy. Trà hạt sen là thức uống thanh mát, nhẹ nhàng phù hợp cho cả buổi sáng và chiều tối.',
      meta_title: "Trà Hạt Sen - Đá",
      slug: "tra-hat-sen-da",
      price: 39.000,
      image_url: "https://product.hstatic.net/1000075078/product/tdcs-nong_288997_53cde51f5e3247258068e08fd536b4c3.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_tra_trai_cay,
      title: "Trà Hạt Sen Nóng",
      body: 'Nền trà oolong hảo hạng kết hợp cùng hạt sen tươi, bùi bùi thơm ngon. Trà hạt sen là thức uống thanh mát, nhẹ nhàng phù hợp cho cả buổi sáng và chiều tối.',
      meta_title: "Trà Hạt Sen - Nóng",
      slug: "tra-hat-sen-nong",
      price: 49.000,
      image_url: "https://product.hstatic.net/1000075078/product/tra-sen-nong_025153_3f1cef3de4894213a883653325b2c83e.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_tra_trai_cay,
      title: "Trà Đào Cam Sả Chai Fresh 500ML",
      body: 'Với phiên bản chai fresh 500ml, thức uống "best seller" đỉnh cao mang một diện mạo tươi mới, tiện lợi, phù hợp với bình thường mới và vẫn giữ nguyên vị thanh ngọt của đào, vị chua dịu của cam vàng nguyên vỏ và vị trà đen thơm lừng ly Trà đào cam sả nguyên bản. *Sản phẩm dùng ngon nhất trong ngày. *Sản phẩm mặc định mức đường và không đá.',
      meta_title: "Trà Đào Cam Sả Chai Fresh 500ML",
      slug: "tra-dao-cam-sa-chai-fresh-500ml",
      price: 105.000,
      image_url: "https://product.hstatic.net/1000075078/product/bottle_tradao_836487_73425d2bcd244d88918412052e15022e.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_tra_sua_macchiato,
      title: "Trà sữa Oolong Nướng Trân Châu",
      body: 'Hương vị chân ái đúng gu đậm đà với trà oolong được “sao” (nướng) lâu hơn cho hương vị đậm đà, hòa quyện với sữa thơm béo mang đến cảm giác mát lạnh, lưu luyến vị trà sữa đậm đà nơi vòm họng.',
      meta_title: "Trà sữa Oolong Nướng Trân Châu",
      slug: "tra-sua-oolong-nuong-tran-chau",
      price: 55.000,
      image_url: "https://product.hstatic.net/1000075078/product/1669736877_tra-sua-oolong-nuong-tran-chau_01dced5c52fd4927bfda9614e037a488.png",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_tra_sua_macchiato,
      title: "Trà sữa Oolong Nướng (Nóng)",
      body: 'Đậm đà chuẩn gu và ấm nóng - bởi lớp trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm ấm áp, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
      meta_title: "Trà sữa Oolong Nướng (Nóng)",
      slug: "tra-sua-oolong-nuong-nong",
      price: 55.000,
      image_url: "https://product.hstatic.net/1000075078/product/oolong-nuong-nong_948581_3941848707824089b555642f8ed9b68a.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_tra_sua_macchiato,
      title: "Trà Sữa Mắc Ca Trân Châu",
      body: 'Mỗi ngày với The Coffee House sẽ là điều tươi mới hơn với sữa hạt mắc ca thơm ngon, bổ dưỡng quyện cùng nền trà oolong cho vị cân bằng, ngọt dịu đi kèm cùng Trân châu trắng giòn dai mang lại cảm giác “đã” trong từng ngụm trà sữa.',
      meta_title: "Trà Sữa Mắc Ca Trân Châu",
      slug: "tra-sua-mac-ca-tran-chau",
      price: 55.000,
      image_url: "https://product.hstatic.net/1000075078/product/tra-sua-mac-ca_377522_661df54d2b3946bd90432432a1d88a4c.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },

    # Hi-Teach Healthy 
    {
      subcategory: subcategory_hi_tea_tra,
      title: "Hi Tea Đào Kombucha",
      body: 'Trà hoa Hibiscus 0% caffeine chua nhẹ, kết hợp cùng trà lên men Kombucha hoàn toàn tự nhiên và Đào thanh mát tạo nên Hi-Tea Đào Kombucha chua ngọt cực cuốn. Đặc biệt Kombucha Detox giàu axit hữu cơ, Đào nhiều chất xơ giúp thanh lọc cơ thể và hỗ trợ giảm cân hiệu quả. Lưu ý: Khuấy đều trước khi dùng',
      meta_title: "Hi-Tea Đào Kombucha",
      slug: "hi-tea-dao-kombucha",
      price: 59.000,
      image_url: "https://product.hstatic.net/1000075078/product/1686716517_kombucha-dao_770ed01743b24047b40e1e1ac3593821.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_hi_tea_tra,
      title: "Hi Tea Yuzu Kombucha",
      body: 'Trà hoa Hibiscus 0% caffeine thanh mát, hòa quyện cùng trà lên men Kombucha 100% tự nhiên và mứt Yuzu Marmalade (quýt Nhật) mang đến hương vị chua chua lạ miệng. Đặc biệt, Hi-Tea Yuzu Kombucha cực hợp cho team thích detox, muốn sáng da nhờ Kombucha Detox nhiều chất chống oxy hoá cùng Yuzu giàu vitamin C. Lưu ý: Khuấy đều trước khi dùng',
      meta_title: "Hi-Tea Yuzu Kombucha",
      slug: "hi-tea-yuzu-kombucha",
      price: 59.000,
      image_url: "https://product.hstatic.net/1000075078/product/1686716508_kombucha-yuzu_94e4097344ec4a69b868d9e10ad14233.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_hi_tea_tra,
      title: "Hi Tea Phúc Bồn Tử Mandarin",
      body: 'Nền trà Hibiscus thanh mát, quyện vị chua chua ngọt ngọt của phúc bồn tử 100% tự nhiên cùng quýt mọng nước mang đến cảm giác sảng khoái tức thì.',
      meta_title: "Hi-Tea Phúc Bồn Tử Mandarin",
      slug: "tra-sua-mac-ca-tran-chau",
      price: 49.000,
      image_url: "https://product.hstatic.net/1000075078/product/1669707649_bg-hitea-quyt-no_6f6013fd192a4da8b70bf07d605af2d2.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },

    # hi-tea-healthy Da tuyet
    {
      subcategory: subcategory_hi_tea_da_tuyet,
      title: "Hi Tea Đá Tuyết Yuzu Vải",
      body: 'Vị trà hoa Hibiscus chua chua, kết hợp cùng đá tuyết Yuzu mát lạnh tái tê, thêm miếng vải căng mọng, ngọt ngào sẽ khiến bạn thích thú ngay từ lần thử đầu tiên.',
      meta_title: "Hi-Tea Đá Tuyết Yuzu Vải",
      slug: "hi-tea-da-tuyet-yuzu-vai",
      price: 59.000,
      image_url: "https://product.hstatic.net/1000075078/product/1653291175_da-tuyet-vai_83c1a60f67504c6c91d5b7dd8499907d.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },

    # Banh man
    {
      subcategory: subcategory_banh_man,
      title: "Bánh Mì Gậy Gà Kim Quất",
      body: 'Phiên bản nâng cấp với trọng lượng tăng 80% so với bánh mì que thông thường, đem đến cho bạn bữa ăn nhanh gọn mà vẫn đầy đủ dinh dưỡng. Cắn một miếng là mê mẩn bởi vỏ bánh nướng giòn rụm, nhân đậm vị với từng miếng thịt gà mềm, ướp sốt kim quất chua ngọt, thơm nức đặc trưng. Càng "đúng bài" hơn khi thưởng thức kèm Cà phê đượm vị hoặc trà Hi-Tea thanh mát.',
      meta_title: "Bánh Mì Gậy Cá Ngừ Mayo",
      slug: "banh-mi-gay-ga-kim-quat",
      price: 25.000,
      image_url: "https://product.hstatic.net/1000075078/product/1669737009_banh-mi-gay-ga-kim-quat_e302b3277a224476be2f3ee31c615e08.png",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_banh_man,
      title: "Bánh Mì Gậy Cá Ngừ Mayo",
      body: 'Trọng lượng tăng 70% so với bánh mì que thông thường, thêm nhiều dinh dưỡng, thích hợp cho cả bữa ăn nhẹ lẫn ăn no. Ngon hết chỗ chê từ vỏ bánh nướng nóng giòn, cá ngừ đậm đà quyện lẫn sốt mayo thơm béo đến từng hạt bắp ngọt bùi hấp dẫn. Nhâm nhi bánh cùng ly Cà phê thơm nồng hay Hi-Tea tươi mát thì đúng chuẩn "điểm mười".',
      meta_title: "Bánh Mì Gậy Cá Ngừ Mayo",
      slug: "banh-mi-gay-ca-ngu-mayo",
      price: 25.000,
      image_url: "https://product.hstatic.net/1000075078/product/1669825303_bami-gay-tunajpg_071d512f4e3b4c73ab365130eb9e1935.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_banh_man,
      title: "Bánh Mì Que Pate",
      body: 'Trọng lượng tăng 70% so với bánh mì que thông thường, thêm nhiều dinh dưỡng, thích hợp cho cả bữa ăn nhẹ lẫn ăn no. Ngon hết chỗ chê từ vỏ bánh nướng nóng giòn, cá ngừ đậm đà quyện lẫn sốt mayo thơm béo đến từng hạt bắp ngọt bùi hấp dẫn. Nhâm nhi bánh cùng ly Cà phê thơm nồng hay Hi-Tea tươi mát thì đúng chuẩn "Vỏ bánh mì giòn tan, kết hợp với lớp nhân pate béo béo đậm đà sẽ là lựa chọn lý tưởng nhẹ nhàng để lấp đầy chiếc bụng đói , cho 1 bữa sáng - trưa - chiều - tối của bạn thêm phần thú vị".',
      meta_title: "Bánh Mì Que Pate",
      slug: "banh-mi-que-pate",
      price: 15.000,
      image_url: "https://product.hstatic.net/1000075078/product/1669736956_banh-mi-que-pate_574aee0f444d42abaa82d560a525b4ef.png",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },

    # Banh ngot
    {
      subcategory: subcategory_banh_ngot,
      title: "Mochi Kem Phúc Bồn Tử",
      body: 'Bao bọc bởi lớp vỏ Mochi dẻo thơm, bên trong là lớp kem lạnh cùng nhân phúc bồn tử ngọt ngào. Gọi 1 chiếc Mochi cho ngày thật tươi mát. Sản phẩm phải bảo quán mát và dùng ngon nhất trong 2h sau khi nhận hàng.',
      meta_title: "Mochi Kem Phúc Bồn Tử",
      slug: "mochi-kem-phuc-bon-tu",
      price: 19.000,
      image_url: "https://product.hstatic.net/1000075078/product/1643102019_mochi-phucbontu_f8326df6a27f4df58df878b15e23f159.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_banh_ngot,
      title: "Mochi Kem Việt Quất",
      body: 'Bao bọc bởi lớp vỏ Mochi dẻo thơm, bên trong là lớp kem lạnh cùng nhân việt quất đặc trưng thơm thơm, ngọt dịu. Gọi 1 chiếc Mochi cho ngày thật tươi mát. Sản phẩm phải bảo quán mát và dùng ngon nhất trong 2h sau khi nhận hàng.',
      meta_title: "Mochi Kem Việt Quất",
      slug: "mochi-kem-viet-quat",
      price: 19.000,
      image_url: "https://product.hstatic.net/1000075078/product/1643102034_mochi-vietquat_ea985cfb7ea54e59a38e858df7182ef3.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_banh_ngot,
      title: "Mochi Kem Dừa Dứa",
      body: 'Bao bọc bởi lớp vỏ Mochi dẻo thơm, bên trong là lớp kem lạnh cùng nhân dừa dứa thơm lừng lạ miệng. Gọi 1 chiếc Mochi cho ngày thật tươi mát. Sản phẩm phải bảo quán mát và dùng ngon nhất trong 2h sau khi nhận hàng.',
      meta_title: "Mochi Kem Dừa Dứa",
      slug: "mochi-kem-dua-dua",
      price: 19.000,
      image_url: "https://product.hstatic.net/1000075078/product/1643101996_mochi-dua_2a5ce60d5a404117925739267e4437dc.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },

    # Snack
    {
      subcategory: subcategory_snack,
      title: "Mít Sấy",
      body: 'Mít sấy khô vàng ươm, giòn rụm, giữ nguyên được vị ngọt lịm của mít tươi.',
      meta_title: "Mít Sấy",
      slug: "mit-say",
      price: 20.000,
      image_url: "https://product.hstatic.net/1000075078/product/mit-say_666228_bddcae8ad43142a493eafa83544bdae4.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
    {
      subcategory: subcategory_snack,
      title: "Gà Xé Lá Chanh",
      body: 'Thịt gà được xé tơi, mang hương vị mặn, ngọt, cay cay quyện nhau vừa chuẩn, thêm chút thơm thơm thơm từ lá chanh sấy khô giòn giòn xua tan ngay cơn buồn miệng.',
      meta_title: "Gà Xé Lá Chanh",
      slug: "ga-xe-la-chanh",
      price: 19.000,
      image_url: "https://product.hstatic.net/1000075078/product/kho-ga-la-chanh_995862_c7d3a627e1234da69150a9230de033b4.jpg",
      published_at: Time.now,
      start_at: Time.now,
      end_at: Time.now + 2.weeks,
    },
  ]

  products.each do |product|
    Product.create!(product)
  end

  product_related_images = [
    {
      id: 1,
      product_id: 6,
      image_url: "https://product.hstatic.net/1000075078/product/1645963560_ca-phe-sua-da-min_da95d4dc25eb4b26bbf50378e1c75a50.png"
    },
    {
      id: 2,
      product_id: 8,
      image_url: "https://product.hstatic.net/1000075078/product/1645962337_bac-siu-da-2_d16c36fd8f9f4c44bb8201276133d977.png"
    },
    {
      id: 3,
      product_id: 15,
      image_url: "https://product.hstatic.net/1000075078/product/1645970584_tra-dao-cam-sa-lifestyle-1_10cd9db294ab4babb1a5c2d062694fc7.jpg"
    },
    {
      id: 4,
      product_id: 15,
      image_url: "https://product.hstatic.net/1000075078/product/1645970585_tra-dao-cam-sa-da-lifestyle-1_1bd00dd352714636a391586fbade3bd3.jpg"
    },
  ]

  product_related_images.each do |product_related_image|
    ProductRelatedImage.create!(product_related_image)
  end
end

if Topping.count.zero?
  first_product = Product.find_by(slug: 'phin-sua-tuoi-banh-flan')

  toppings = [
    {
      name: 'Kem Phô Mai Macchiato',
      price: 10.000,
      product: first_product
    },
    {
      name: 'Shot Espresso',
      price: 10.000,
      product: first_product
    },
    {
      name: 'Trân châu trắng',
      price: 10.000,
      product: first_product
    },
    {
      name: 'Sốt Caramel',
      price: 10.000,
      product: first_product
    },
    {
      name: 'Thạch Cà Phê',
      price: 10.000,
      product: first_product
    },
    {
      name: 'Bánh Flan',
      price: 15.000,
      product: first_product
    },
  ]

  toppings.each do |topping|
    Topping.create!(topping)
  end
end

if Size.count.zero?
  first_product = Product.find_by(slug: 'phin-sua-tuoi-banh-flan')

  sizes = [
    {
      name: 'Nhỏ',
      price: 0.000
    },
    {
      name: 'Vừa',
      price: 6.000
    },
    {
      name: 'Lớn',
      price: 16.000
    },
  ]

  sizes.each do |size|
    new_size = Size.create!(size)
    ProductSize.create!(product: first_product, size: new_size)
  end
end

# if Voucher.count.zero?
#   Voucher.create(
#     product_id: Product.where('id = 1').pluck(:id),
#     code: 123,
#     description: "Voucher 1",
#     discount_type: 0, # Assuming 0 represents percentage and 1 represents fixed_amount
#     discount_value: 10.0,
#     is_used: false,
#     start_at: DateTime.now,
#     end_at: DateTime.now + 1.week
#   )
#
#   Voucher.create(
#     product: Product.where('id = 1').pluck(:id),
#     code: 456,
#     description: "Voucher 2",
#     discount_type: 1, # Assuming 0 represents percentage and 1 represents fixed_amount
#     discount_value: 5.0,
#     is_used: true,
#     start_at: DateTime.now - 1.week,
#     end_at: DateTime.now + 1.week
#   )
# end

# if Item.count.zero?
#   Item.create!(
#     [
#       {
#         title: "Red (Taylor's Version)",
#         description: 'Taylor Swift is an American singer-songwriter',
#         artist: taylor,
#         image_url: 'image.com'
#       },
#       {
#         title:  "All Too Well (Taylor's Version)",
#         description: 'Taylor Swift is an American singer-songwriter',
#         artist: taylor,
#         image_url: 'image.com'
#       },
#       {
#         title: "We Are Never Ever Getting Back Together (Taylor's Version)",
#         description: 'Taylor Swift is an American singer-songwriter',
#         artist: taylor,
#         image_url: 'image.com'
#       }
#     ]
#   )
# end
