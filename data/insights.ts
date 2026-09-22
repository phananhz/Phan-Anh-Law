import { Insight } from './types';

export const insights: Insight[] = [
  {
    id: 'fdi-commercial-trading-regulations',
    slug: 'fdi-commercial-trading-regulations',
    title: 'Cập nhật pháp lý về hoạt động thương mại của doanh nghiệp có vốn đầu tư nước ngoài tại Việt Nam',
    excerpt: 'Phân tích các thay đổi trọng yếu trong cấp Giấy phép kinh doanh, điều kiện kiểm tra nhu cầu kinh tế (ENT), và nghĩa vụ lưu ký tài khoản vốn đối với khối thương mại bán lẻ FDI.',
    category: 'FDI',
    type: 'Cập nhật pháp luật',
    publishDate: '2026-09-18',
    formattedDate: '18.09.2026',
    readTime: '12 phút đọc',
    authorSlug: 'phan-anh-nguyen',
    authorName: 'Luật sư Phan Anh',
    authorRole: 'Managing Partner',
    featured: true,
    abstractTheme: 'Architectural Prisms & Linear Reflections',
    legalReferences: [
      {
        document: 'Nghị định số 09/2018/NĐ-CP',
        article: 'Điều 5, Điều 9 & Điều 23',
        effectiveDate: '15/01/2018 (sửa đổi, bổ sung cập nhật 2026)',
        summary: 'Quy định chi tiết Luật Thương mại và Luật Quản lý ngoại thương về hoạt động mua bán hàng hóa và các hoạt động liên quan trực tiếp đến mua bán hàng hóa của nhà đầu tư nước ngoài.',
      },
      {
        document: 'Luật Đầu tư số 61/2020/QH14',
        article: 'Điều 9 & Phụ lục I',
        effectiveDate: '01/01/2021',
        summary: 'Quy định về ngành nghề tiếp cận thị trường có điều kiện đối với nhà đầu tư nước ngoài và thủ tục chấp thuận chủ trương đầu tư.',
      },
      {
        document: 'Thông tư số 06/2019/TT-NHNN',
        article: 'Điều 5 & Điều 8',
        effectiveDate: '06/09/2019',
        summary: 'Hướng dẫn về quản lý ngoại hối đối với hoạt động đầu tư trực tiếp nước ngoài vào Việt Nam.',
      },
    ],
    toc: [
      { id: 'tong-quan-khung-phap-ly', title: '1. Tổng quan khuôn khổ pháp lý điều chỉnh hoạt động thương mại FDI', level: 2 },
      { id: 'dieu-kien-cap-gpkd', title: '2. Điều kiện cấp Giấy phép kinh doanh mua bán hàng hóa', level: 2 },
      { id: 'quy-trinh-ent', title: '3. Kiểm tra nhu cầu kinh tế (ENT) khi mở cơ sở bán lẻ thứ hai trở đi', level: 2 },
      { id: 'tai-khoan-von-ngoai-hoi', title: '4. Kiểm soát dòng tiền và nghĩa vụ tài khoản vốn trực tiếp DICA', level: 2 },
      { id: 'khuyen-nghi-thuc-tien', title: '5. Khuyến nghị thực tiễn cho doanh nghiệp và ban điều hành', level: 2 },
    ],
    contentHtml: `
      <p class="lead">Hoạt động thương mại mua bán hàng hóa và mở rộng chuỗi bán lẻ của doanh nghiệp có vốn đầu tư nước ngoài (FDI) luôn là một trong những lĩnh vực chịu sự giám sát pháp lý chặt chẽ nhất từ các cơ quan quản lý nhà nước tại Việt Nam. Bài viết này tổng hợp những điểm điều chỉnh mới nhất, phân tích tác động thực tiễn và đưa ra khuyến nghị phòng ngừa rủi ro cho ban điều hành.</p>

      <h2 id="tong-quan-khung-phap-ly">1. Tổng quan khuôn khổ pháp lý điều chỉnh hoạt động thương mại FDI</h2>
      <p>Theo quy định hiện hành của Luật Thương mại và các văn bản hướng dẫn, nhà đầu tư nước ngoài khi tham gia vào chuỗi cung ứng thương mại nội địa phải tuân thủ cả hai tầng điều kiện: điều kiện đăng ký đầu tư thành lập pháp nhân và điều kiện cấp giấy phép kinh doanh ngành nghề mua bán hàng hóa chuyên biệt.</p>
      <p>Điểm mấu chốt mà các tập đoàn FDI thường gặp vướng mắc là sự phân định giữa <strong>quyền xuất khẩu, quyền nhập khẩu</strong> (được tự động ghi nhận trên ERC/IRC theo biểu cam kết WTO) và <strong>quyền phân phối bán buôn, quyền phân phối bán lẻ</strong> (bắt buộc phải xin cấp Giấy phép kinh doanh của Sở Công Thương hoặc Bộ Công Thương).</p>

      <div class="legal-callout">
        <h4 class="font-medium text-emerald-900 mb-1">Lưu ý quan trọng từ Ban Pháp chế Phan Anh Law:</h4>
        <p class="text-sm text-stone-700">Việc nhập khẩu hàng hóa vào Việt Nam không đương nhiên trao cho doanh nghiệp quyền bán lẻ trực tiếp hàng hóa đó tới người tiêu dùng cuối cùng nếu doanh nghiệp chưa được cơ quan có thẩm quyền cấp Giấy phép kinh doanh có nội dung bán lẻ.</p>
      </div>

      <h2 id="dieu-kien-cap-gpkd">2. Điều kiện cấp Giấy phép kinh doanh mua bán hàng hóa</h2>
      <p>Để được cấp Giấy phép kinh doanh (GPKD), doanh nghiệp có vốn FDI cần đáp ứng một loạt tiêu chí khắt khe được quy định chi tiết tại Điều 9 Nghị định 09/2018/NĐ-CP:</p>
      <ul>
        <li><strong>Năng lực tài chính:</strong> Có kế hoạch tài chính cụ thể, vốn điều lệ đã góp đủ theo thời hạn luật định và có xác nhận kiểm toán hoặc sao kê ngân hàng độc lập.</li>
        <li><strong>Kế hoạch kinh doanh:</strong> Thuyết minh chi tiết địa điểm, phương thức bán lẻ (trực tiếp tại cửa hàng, thương mại điện tử, đại lý), kế hoạch nhân sự và giải pháp đóng góp ngân sách nhà nước.</li>
        <li><strong>Không còn nợ thuế quá hạn:</strong> Có văn bản xác nhận không nợ đọng nghĩa vụ thuế từ Cục Thuế địa phương nơi doanh nghiệp đặt trụ sở chính.</li>
        <li><strong>Bảo đảm an ninh, trật tự xã hội:</strong> Các ngành hàng nhạy cảm (như thiết bị viễn thông, hóa chất, vật tư y tế) phải trải qua quy trình lấy ý kiến Bộ quản lý chuyên ngành.</li>
      </ul>

      <h2 id="quy-trinh-ent">3. Kiểm tra nhu cầu kinh tế (ENT) khi mở cơ sở bán lẻ thứ hai trở đi</h2>
      <p>Kiểm tra nhu cầu kinh tế (Economic Needs Test - ENT) là rào cản kỹ thuật được thiết lập nhằm bảo vệ mạng lưới thương mại truyền thống của địa phương. Theo nguyên tắc chung, cơ sở bán lẻ đầu tiên của doanh nghiệp FDI không phải thực hiện kiểm tra ENT; tuy nhiên, từ cơ sở bán lẻ thứ hai trở đi, việc thành lập phải được Hội đồng ENT cấp tỉnh thẩm định và chấp thuận.</p>
      
      <div class="my-6 overflow-x-auto">
        <table class="w-full text-left border-collapse border border-stone-300 text-sm">
          <thead>
            <tr class="bg-paper-alt text-ink font-semibold">
              <th class="p-3 border border-stone-300">Tiêu chí thẩm định ENT</th>
              <th class="p-3 border border-stone-300">Yêu cầu hồ sơ giải trình</th>
              <th class="p-3 border border-stone-300">Thời gian xử lý dự kiến</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-3 border border-stone-300 font-medium">Quy mô thị trường địa lý</td>
              <td class="p-3 border border-stone-300">Mật độ dân số, bán kính phục vụ và lưu lượng giao thông tại địa điểm bán lẻ dự kiến.</td>
              <td class="p-3 border border-stone-300">30–45 ngày làm việc</td>
            </tr>
            <tr>
              <td class="p-3 border border-stone-300 font-medium">Mức độ tác động đến chợ truyền thống</td>
              <td class="p-3 border border-stone-300">Khảo sát độc lập về số lượng hộ kinh doanh cá thể trong bán kính 1km.</td>
              <td class="p-3 border border-stone-300">Tùy thuộc lịch họp Hội đồng</td>
            </tr>
            <tr>
              <td class="p-3 border border-stone-300 font-medium">Đóng góp kinh tế - xã hội</td>
              <td class="p-3 border border-stone-300">Tỷ lệ sử dụng lao động địa phương, chính sách phúc lợi và thuế đóng góp hàng năm.</td>
              <td class="p-3 border border-stone-300">Kèm hồ sơ dự án</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>Cần lưu ý rằng các trường hợp cơ sở bán lẻ dưới 500m2 nằm trong trung tâm thương mại và không thuộc diện phân loại siêu thị mini vẫn có thể được xem xét miễn ENT theo quy định mở của các hiệp định EVFTA / CPTPP, tuy nhiên cần có ý kiến chấp thuận bằng văn bản của Bộ Công Thương trước khi tiến hành ký kết hợp đồng thuê địa điểm.</p>

      <h2 id="tai-khoan-von-ngoai-hoi">4. Kiểm soát dòng tiền và nghĩa vụ tài khoản vốn trực tiếp DICA</h2>
      <p>Bên cạnh giấy phép ngành nghề, việc quản lý ngoại hối và các giao dịch chuyển tiền xuyên biên giới là rủi ro tiềm ẩn mà nhiều CFO doanh nghiệp ngoại thường bỏ sót. Theo Thông tư 06/2019/TT-NHNN, toàn bộ các giao dịch:</p>
      <ul>
        <li>Góp vốn điều lệ;</li>
        <li>Chuyển nhượng vốn góp / cổ phần giữa nhà đầu tư nước ngoài và nhà đầu tư trong nước;</li>
        <li>Vay nợ nước ngoài trung và dài hạn;</li>
        <li>Chuyển lợi nhuận hợp pháp về nước;</li>
      </ul>
      <p>bắt buộc phải thực hiện thông qua duy nhất <strong>01 Tài khoản Vốn Đầu tư Trực tiếp (DICA)</strong> mở tại một ngân hàng thương mại được phép hoạt động tại Việt Nam. Việc sử dụng tài khoản thanh toán vãng lai để chuyển nhượng vốn có thể dẫn đến việc giao dịch bị vô hiệu và phạt vi phạm hành chính về quản lý ngoại hối.</p>

      <h2 id="khuyen-nghi-thuc-tien">5. Khuyến nghị thực tiễn cho doanh nghiệp và ban điều hành</h2>
      <p>Để tối ưu hóa thời gian và kiểm soát rủi ro pháp lý khi triển khai hoạt động thương mại bán lẻ tại Việt Nam, Phan Anh Law khuyến nghị các doanh nghiệp thực hiện 3 bước kiểm soát trọng yếu:</p>
      <ol>
        <li><strong>Rà soát tiền thẩm định (Pre-clearance):</strong> Trước khi ký hợp đồng nguyên tắc thuê mặt bằng, cần làm việc sơ bộ với Sở Công Thương để xác định khu vực dự kiến có nằm trong quy hoạch phát triển mạng lưới thương mại hay không.</li>
        <li><strong>Chuẩn hóa cấu trúc vốn:</strong> Đảm bảo tỷ lệ vốn góp của các thành viên nước ngoài được phân bổ rõ ràng và đã hoàn thành 100% nghĩa vụ góp vốn trong 90 ngày kể từ ngày cấp ERC.</li>
        <li><strong>Định kỳ kiểm toán tuân thủ giấy phép:</strong> Các giấy phép kinh doanh bán lẻ thường có thời hạn 5 năm, doanh nghiệp cần lập kế hoạch gia hạn tối thiểu 6 tháng trước ngày hết hạn để tránh gián đoạn chuỗi vận hành.</li>
      </ol>
    `,
  },
  {
    id: 'mergers-acquisitions-due-diligence-vietnam-2026',
    slug: 'mergers-acquisitions-due-diligence-vietnam-2026',
    title: 'Kiểm soát rủi ro pháp lý trong thẩm định M&A (Due Diligence) tại Việt Nam',
    excerpt: 'Những bài học thực tiễn về xác minh quyền sở hữu tài sản, tranh chấp tiềm ẩn với cổ đông sáng lập và thủ tục thông báo tập trung kinh tế.',
    category: 'M&A',
    type: 'Bài phân tích chuyên sâu',
    publishDate: '2026-09-12',
    formattedDate: '12.09.2026',
    readTime: '9 phút đọc',
    authorSlug: 'tran-hoang-nam',
    authorName: 'Luật sư Trần Hoàng Nam',
    authorRole: 'Partner - Corporate & Real Estate',
    abstractTheme: 'Interlocking Structural Geometries',
    legalReferences: [
      {
        document: 'Luật Cạnh tranh số 23/2018/QH14',
        article: 'Điều 30, Điều 33 & Nghị định 35/2020/NĐ-CP',
        effectiveDate: '01/07/2019',
        summary: 'Quy định ngưỡng thông báo tập trung kinh tế và trách nhiệm pháp lý khi không thực hiện thông báo trước khi ký kết giao dịch M&A.',
      },
    ],
    toc: [
      { id: 'vai-tro-due-diligence', title: '1. Tầm quan trọng của Legal Due Diligence trong giao dịch M&A', level: 2 },
      { id: 'cac-vung-rui-ro-cot-loi', title: '2. Các vùng rủi ro cốt lõi cần thẩm tra kỹ lưỡng', level: 2 },
      { id: 'thong-bao-tap-trung-kinh-te', title: '3. Ngưỡng thông báo tập trung kinh tế với Ủy ban Cạnh tranh Quốc gia', level: 2 },
      { id: 'thiet-ke-dieu-khoan-bao-ve', title: '4. Thiết kế điều khoản cam kết bồi hoàn (Indemnity) trong hợp đồng SPA', level: 2 },
    ],
    contentHtml: `
      <p class="lead">Thẩm định pháp lý (Legal Due Diligence - LDD) không đơn thuần là việc kiểm tra danh sách tài liệu, mà là công cụ định giá và thương lượng điều khoản hợp đồng quan trọng nhất của bên mua trong mọi giao dịch M&A.</p>
      <h2 id="vai-tro-due-diligence">1. Tầm quan trọng của Legal Due Diligence trong giao dịch M&A</h2>
      <p>Một báo cáo LDD chất lượng cao phải chỉ rõ: rủi ro nào là "deal breaker" (buộc phải dừng thương vụ), rủi ro nào có thể định lượng thành số tiền khấu trừ vào giá mua (purchase price adjustment), và rủi ro nào cần được khắc phục trước thời điểm đóng giao dịch (Conditions Precedent - CP).</p>
      <h2 id="cac-vung-rui-ro-cot-loi">2. Các vùng rủi ro cốt lõi cần thẩm tra kỹ lưỡng</h2>
      <p>Tại Việt Nam, kinh nghiệm thực tiễn cho thấy 3 khu vực rủi ro phổ biến nhất gồm:</p>
      <ul>
        <li><strong>Lịch sử góp vốn điều lệ:</strong> Việc tăng vốn "ảo" hoặc góp vốn bằng tài sản chưa qua định giá độc lập có thể khiến tư cách cổ đông của bên bán bị thách thức pháp lý.</li>
        <li><strong>Quyền sử dụng đất và cấp phép xây dựng:</strong> Nhiều doanh nghiệp mục tiêu vận hành nhà xưởng trên đất thuê trả tiền hàng năm nhưng tự ý chuyển mục đích hoặc chưa nghiệm thu PCCC.</li>
        <li><strong>Nợ nghĩa vụ thuế và bảo hiểm xã hội:</strong> Các khoản truy thu tiềm tàng từ việc kê khai sai giá chuyển nhượng hoặc hợp đồng lao động không đúng bản chất.</li>
      </ul>
      <h2 id="thong-bao-tap-trung-kinh-te">3. Ngưỡng thông báo tập trung kinh tế với Ủy ban Cạnh tranh Quốc gia</h2>
      <p>Theo Nghị định 35/2020/NĐ-CP, nếu tổng tài sản hoặc tổng doanh thu tại Việt Nam của một trong các bên tham gia giao dịch đạt từ 3.000 tỷ đồng trở lên, giao dịch bắt buộc phải thực hiện thủ tục thông báo tập trung kinh tế trước khi hoàn tất chuyển nhượng cổ phần.</p>
      <h2 id="thiet-ke-dieu-khoan-bao-ve">4. Thiết kế điều khoản cam kết bồi hoàn (Indemnity) trong hợp đồng SPA</h2>
      <p>Bên mua cần thiết lập tài khoản phong tỏa (Escrow Account) giữ lại từ 10% đến 20% giá trị hợp đồng trong 12-24 tháng sau ngày đóng giao dịch để bảo đảm bên bán thực hiện đầy đủ nghĩa vụ bồi hoàn thuế và bồi thường tranh chấp phát sinh từ giai đoạn tiền giao dịch.</p>
    `,
  },
  {
    id: 'personal-data-protection-decree-13-compliance',
    slug: 'personal-data-protection-decree-13-compliance',
    title: 'Xây dựng hồ sơ đánh giá tác động xử lý dữ liệu cá nhân (DPIA) theo Nghị định 13/2023/NĐ-CP',
    excerpt: 'Hướng dẫn thực hành các bước kiểm kê dòng dữ liệu, thiết lập mẫu chấp thuận hợp lệ và hoàn tất hồ sơ DPIA gửi Cục An ninh mạng Bộ Công an.',
    category: 'Tuân thủ',
    type: 'Cẩm nang pháp lý',
    publishDate: '2026-09-05',
    formattedDate: '05.09.2026',
    readTime: '8 phút đọc',
    authorSlug: 'le-thu-trang',
    authorName: 'Luật sư Lê Thu Trang',
    authorRole: 'Partner - Employment & Licensing',
    abstractTheme: 'Abstract Encrypted Lattice & Light Path',
    legalReferences: [
      {
        document: 'Nghị định số 13/2023/NĐ-CP',
        article: 'Điều 24 & Điều 25',
        effectiveDate: '01/07/2023',
        summary: 'Quy định về bảo vệ dữ liệu cá nhân, trách nhiệm của Bên Kiểm soát dữ liệu và Bên Xử lý dữ liệu.',
      },
    ],
    toc: [
      { id: 'tong-quan-nghi-dinh-13', title: '1. Nghĩa vụ tuân thủ đối với doanh nghiệp có khách hàng và người lao động', level: 2 },
      { id: 'kiem-ke-dong-du-lieu', title: '2. Các bước lập bản đồ luồng dữ liệu (Data Flow Mapping)', level: 2 },
      { id: 'ho-so-dpia', title: '3. Soạn thảo Hồ sơ đánh giá tác động DPIA', level: 2 },
      { id: 'chuyen-du-lieu-xuyen-bien-gioi', title: '4. Chuyển dữ liệu cá nhân ra nước ngoài', level: 2 },
    ],
    contentHtml: `
      <p class="lead">Nghị định 13/2023/NĐ-CP đã đặt dấu mốc quan trọng trong việc thiết lập chuẩn mực bảo vệ dữ liệu cá nhân tại Việt Nam, tiệm cận với tiêu chuẩn GDPR của Châu Âu. Các doanh nghiệp không chỉ phải xin chấp thuận hợp lệ từ chủ thể dữ liệu mà còn phải lập hồ sơ lưu trữ nội bộ và gửi tới Bộ Công an.</p>
      <h2 id="tong-quan-nghi-dinh-13">1. Nghĩa vụ tuân thủ đối với doanh nghiệp có khách hàng và người lao động</h2>
      <p>Mọi doanh nghiệp thu thập thông tin nhân sự (CCCD, tài khoản ngân hàng, hồ sơ y tế) hoặc thông tin khách hàng tiêu dùng (họ tên, số điện thoại, địa chỉ, lịch sử mua sắm) đều là Bên Kiểm soát hoặc Bên Xử lý dữ liệu cá nhân, phải chịu toàn diện nghĩa vụ bảo mật.</p>
      <h2 id="kiem-ke-dong-du-lieu">2. Các bước lập bản đồ luồng dữ liệu (Data Flow Mapping)</h2>
      <p>Doanh nghiệp cần xác định rõ: dữ liệu được thu thập từ kênh nào, lưu trữ tại máy chủ nội bộ hay đám mây nước ngoài, ai có quyền truy cập, và quy trình tiêu hủy dữ liệu khi hết hạn hợp đồng diễn ra như thế nào.</p>
      <h2 id="ho-so-dpia">3. Soạn thảo Hồ sơ đánh giá tác động DPIA</h2>
      <p>Hồ sơ đánh giá tác động xử lý dữ liệu cá nhân phải luôn có sẵn tại doanh nghiệp và một bộ hồ sơ gốc phải gửi tới Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao (A05) trong thời hạn 60 ngày kể từ ngày tiến hành xử lý dữ liệu.</p>
      <h2 id="chuyen-du-lieu-xuyen-bien-gioi">4. Chuyển dữ liệu cá nhân ra nước ngoài</h2>
      <p>Trường hợp doanh nghiệp FDI sử dụng hệ thống ERP hoặc phần mềm quản lý nhân sự tập trung đặt tại máy chủ công ty mẹ ở Singapore, Nhật Bản hay Hoa Kỳ, doanh nghiệp phải lập thêm Hồ sơ đánh giá tác động chuyển dữ liệu ra nước ngoài theo Điều 25 Nghị định 13.</p>
    `,
  },
  {
    id: 'corporate-income-tax-incentives-high-tech-vietnam',
    slug: 'corporate-income-tax-incentives-high-tech-vietnam',
    title: 'Tối ưu hóa ưu đãi thuế TNDN cho dự án công nghệ và trung tâm R&D tại Việt Nam',
    excerpt: 'Điều kiện áp dụng mức thuế suất 10% trong 15 năm, miễn thuế 4 năm và giảm 50% trong 9 năm tiếp theo đối với các dự án công nghệ cao mới thành lập.',
    category: 'Thuế',
    type: 'Bài phân tích chuyên sâu',
    publishDate: '2026-08-28',
    formattedDate: '28.08.2026',
    readTime: '10 phút đọc',
    authorSlug: 'nguyen-viet-hung',
    authorName: 'Chuyên gia Nguyễn Việt Hùng',
    authorRole: 'Senior Tax & Compliance Advisor',
    abstractTheme: 'Layered Minimalist Graph & Financial Prisms',
    legalReferences: [
      {
        document: 'Luật Thuế Thu nhập doanh nghiệp số 14/2008/QH12 (sửa đổi, bổ sung)',
        article: 'Điều 13 & Điều 14',
        effectiveDate: '01/01/2009',
        summary: 'Các mức ưu đãi thuế suất và thời gian miễn, giảm thuế cho các dự án đầu tư mới thuộc lĩnh vực công nghệ cao và R&D.',
      },
    ],
    toc: [
      { id: 'khung-uu-dai-thue-tndn', title: '1. Khung chính sách ưu đãi thuế TNDN cao nhất tại Việt Nam', level: 2 },
      { id: 'tieu-chi-du-an-cong-nghe-cao', title: '2. Tiêu chuẩn xét duyệt dự án công nghệ cao và R&D', level: 2 },
      { id: 'rui-ro-bi-truy-thu', title: '3. Những sai sót dẫn đến việc bị loại trừ ưu đãi thuế khi thanh tra', level: 2 },
      { id: 'khuyen-nghi-cho-cfo', title: '4. Lộ trình chuẩn bị hồ sơ cho CFO và Ban Kế toán', level: 2 },
    ],
    contentHtml: `
      <p class="lead">Việt Nam tiếp tục duy trì chính sách thu hút đầu tư có chọn lọc, ưu tiên các dự án công nghệ cao, sản xuất vi mạch bán dẫn và các trung tâm nghiên cứu phát triển (R&D). Việc nắm vững điều kiện ưu đãi giúp doanh nghiệp tiết kiệm hàng chục triệu USD tiền thuế hợp pháp.</p>
      <h2 id="khung-uu-dai-thue-tndn">1. Khung chính sách ưu đãi thuế TNDN cao nhất tại Việt Nam</h2>
      <p>Đối với các dự án đầu tư mới thuộc lĩnh vực công nghệ cao hoặc nằm tại khu công nghệ cao, doanh nghiệp được hưởng mức thuế suất ưu đãi 10% trong thời hạn 15 năm, miễn thuế tối đa 4 năm kể từ khi có thu nhập chịu thuế và giảm 50% số thuế phải nộp trong tối đa 9 năm tiếp theo.</p>
      <h2 id="tieu-chi-du-an-cong-nghe-cao">2. Tiêu chuẩn xét duyệt dự án công nghệ cao và R&D</h2>
      <p>Doanh nghiệp phải đáp ứng đồng thời các tiêu chí: tỷ lệ doanh thu từ sản phẩm công nghệ cao đạt tối thiểu 70%, tỷ lệ chi phí cho hoạt động R&D đạt từ 1-2% tổng doanh thu và tỷ lệ lao động có trình độ đại học trực tiếp làm R&D đạt chuẩn theo Quyết định của Thủ tướng Chính phủ.</p>
      <h2 id="rui-ro-bi-truy-thu">3. Những sai sót dẫn đến việc bị loại trừ ưu đãi thuế khi thanh tra</h2>
      <p>Nhiều doanh nghiệp bị truy thu thuế sau 3-5 năm vận hành do hạch toán lẫn lộn giữa doanh thu được ưu đãi và doanh thu từ hoạt động thương mại thông thường, hoặc không lưu trữ đầy đủ bảng chấm công và kết quả nghiên cứu cụ thể của phòng R&D.</p>
      <h2 id="khuyen-nghi-cho-cfo">4. Lộ trình chuẩn bị hồ sơ cho CFO và Ban Kế toán</h2>
      <p>Cần xây dựng hệ thống tài khoản kế toán riêng biệt (cost center) cho từng dòng sản phẩm ngay từ ngày đầu hoạt động và thực hiện kiểm toán độc lập về các chỉ tiêu R&D hàng năm để đính kèm hồ sơ quyết toán thuế TNDN.</p>
    `,
  },
  {
    id: 'labor-dispute-non-compete-agreements-vietnam',
    slug: 'labor-dispute-non-compete-agreements-vietnam',
    title: 'Hiệu lực pháp lý của Thỏa thuận không cạnh tranh (NDA / NCA) trong quan hệ lao động',
    excerpt: 'Xu hướng phán quyết của Tòa án và Hội đồng Trọng tài VIAC về thỏa thuận cấm nhân sự làm việc cho đối thủ cạnh tranh sau khi nghỉ việc.',
    category: 'Lao động',
    type: 'Bình luận chính sách',
    publishDate: '2026-08-15',
    formattedDate: '15.08.2026',
    readTime: '7 phút đọc',
    authorSlug: 'le-thu-trang',
    authorName: 'Luật sư Lê Thu Trang',
    authorRole: 'Partner - Employment & Licensing',
    abstractTheme: 'Linear Boundaries & Contrast Shadows',
    legalReferences: [
      {
        document: 'Bộ luật Lao động số 45/2019/QH14',
        article: 'Điều 10 & Điều 21',
        effectiveDate: '01/01/2021',
        summary: 'Quyền tự do làm việc, lựa chọn việc làm và quy định về bảo vệ bí mật kinh doanh, bí mật công nghệ.',
      },
    ],
    toc: [
      { id: 'xung-dot-phap-ly', title: '1. Xung đột giữa quyền tự do làm việc và bảo vệ bí mật kinh doanh', level: 2 },
      { id: 'quan-diem-toa-an-va-viac', title: '2. Quan điểm của Tòa án và Hội đồng Trọng tài VIAC', level: 2 },
      { id: 'thiet-ke-nca-hop-le', title: '3. Cách thiết kế thỏa thuận NCA có giá trị thực thi cao', level: 2 },
    ],
    contentHtml: `
      <p class="lead">Tranh chấp thỏa thuận không cạnh tranh (Non-Compete Agreement - NCA) giữa người sử dụng lao động và các nhân sự quản lý cấp cao là chủ đề tranh luận pháp lý sôi nổi nhất trong những năm gần đây tại Việt Nam.</p>
      <h2 id="xung-dot-phap-ly">1. Xung đột giữa quyền tự do làm việc và bảo vệ bí mật kinh doanh</h2>
      <p>Một bên là quyền hiến định của người lao động được tự do lựa chọn nghề nghiệp và nơi làm việc theo Điều 10 BLLĐ 2019. Một bên là quyền hợp pháp của doanh nghiệp được bảo vệ tài sản bí mật công nghệ theo Điều 21 BLLĐ 2019 và Luật Sở hữu trí tuệ.</p>
      <h2 id="quan-diem-toa-an-va-viac">2. Quan điểm của Tòa án và Hội đồng Trọng tài VIAC</h2>
      <p>Tại VIAC, xu hướng công nhận tính hiệu lực của thỏa thuận NCA độc lập được xem là giao dịch dân sự tự nguyện ngày càng rõ nét, đặc biệt khi doanh nghiệp có chi trả khoản bồi thường tài chính tương xứng cho nhân sự trong thời gian cam kết không cạnh tranh.</p>
      <h2 id="thiet-ke-nca-hop-le">3. Cách thiết kế thỏa thuận NCA có giá trị thực thi cao</h2>
      <p>Doanh nghiệp cần giới hạn phạm vi địa lý hợp lý (không cấm trên toàn lãnh thổ), thời gian cấm không quá 12 tháng, xác định đích danh danh sách đối thủ cạnh tranh trực tiếp và bắt buộc phải gắn liền với một khoản trợ cấp hạn chế cạnh tranh được chi trả định kỳ hàng tháng sau khi chấm dứt HĐLĐ.</p>
    `,
  },
  {
    id: 'land-law-2024-implications-foreign-enterprises',
    slug: 'land-law-2024-implications-foreign-enterprises',
    title: 'Tác động của Luật Đất đai mới đối với doanh nghiệp có vốn đầu tư nước ngoài',
    excerpt: 'Những điểm mới về quyền tiếp cận đất đai, hình thức trả tiền thuê đất hàng năm hoặc một lần và quyền thế chấp quyền thuê đất tại tổ chức tín dụng.',
    category: 'Đầu tư',
    type: 'Cập nhật pháp luật',
    publishDate: '2026-08-02',
    formattedDate: '02.08.2026',
    readTime: '11 phút đọc',
    authorSlug: 'phan-anh-nguyen',
    authorName: 'Luật sư Phan Anh',
    authorRole: 'Managing Partner',
    abstractTheme: 'Land Grids & Topographical Contours',
    legalReferences: [
      {
        document: 'Luật Đất đai số 31/2024/QH15',
        article: 'Điều 28, Điều 120 & Điều 153',
        effectiveDate: '01/08/2024',
        summary: 'Quy định về quyền và nghĩa vụ sử dụng đất của tổ chức kinh tế có vốn đầu tư nước ngoài và bảng giá đất sát thị trường.',
      },
    ],
    toc: [
      { id: 'mo-rong-quyen-tiep-can', title: '1. Mở rộng quyền tiếp cận đất đai cho doanh nghiệp FDI', level: 2 },
      { id: 'chuyen-doi-hinh-thuc-thue-dat', title: '2. Tác động của cơ chế trả tiền thuê đất hàng năm', level: 2 },
      { id: 'the-chap-quyen-thue-dat', title: '3. Quyền thế chấp quyền thuê trong hợp đồng thuê đất hàng năm', level: 2 },
      { id: 'bang-gia-dat-thi-truong', title: '4. Ảnh hưởng của bảng giá đất hàng năm đến chi phí dự án', level: 2 },
    ],
    contentHtml: `
      <p class="lead">Luật Đất đai 2024 đánh dấu bước ngoặt thể chế quan trọng nhất của thập kỷ đối với thị trường bất động sản và các dự án sản xuất công nghiệp tại Việt Nam. Việc bình đẳng hóa quyền tiếp cận đất giữa doanh nghiệp trong nước và doanh nghiệp FDI mang lại nhiều cơ hội nhưng cũng đi kèm áp lực chi phí đất đai thực tế.</p>
      <h2 id="mo-rong-quyen-tiep-can">1. Mở rộng quyền tiếp cận đất đai cho doanh nghiệp FDI</h2>
      <p>Luật mới cho phép doanh nghiệp có vốn đầu tư nước ngoài nhận chuyển nhượng quyền sử dụng đất trong khu công nghiệp, khu công nghệ cao từ tổ chức, cá nhân khác, tạo điều kiện thuận lợi cho các giao dịch M&A dự án công nghiệp diễn ra linh hoạt hơn.</p>
      <h2 id="chuyen-doi-hinh-thuc-thue-dat">2. Tác động của cơ chế trả tiền thuê đất hàng năm</h2>
      <p>Nhà nước thu hẹp đáng kể các trường hợp được thuê đất trả tiền một lần cho cả thời gian thuê, chuyển đa số sang hình thức trả tiền hàng năm. Điều này giúp giảm chi phí đầu tư ban đầu của nhà đầu tư nhưng đòi hỏi sự dự báo cẩn trọng về biên độ tăng giá thuê định kỳ.</p>
      <h2 id="the-chap-quyen-thue-dat">3. Quyền thế chấp quyền thuê trong hợp đồng thuê đất hàng năm</h2>
      <p>Điểm đột phá là doanh nghiệp thuê đất trả tiền hàng năm được quyền thế chấp "quyền thuê trong hợp đồng thuê đất" tại các tổ chức tín dụng được phép hoạt động tại Việt Nam để vay vốn sản xuất kinh doanh, tháo gỡ điểm nghẽn huy động vốn tồn tại nhiều năm.</p>
      <h2 id="bang-gia-dat-thi-truong">4. Ảnh hưởng của bảng giá đất hàng năm đến chi phí dự án</h2>
      <p>Việc bỏ khung giá đất cũ và ban hành Bảng giá đất hàng năm theo nguyên tắc thị trường đồng nghĩa chi phí đền bù giải phóng mặt bằng và tiền thuê đất sẽ tiệm cận giá trị thực tế, đòi hỏi chủ đầu tư phải tính toán kỹ lưỡng bài toán dòng tiền tài chính dự án.</p>
    `,
  },
];
