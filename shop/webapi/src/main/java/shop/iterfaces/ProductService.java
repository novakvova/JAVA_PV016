package shop.iterfaces;

import shop.dto.product.ProductCreateDTO;
import shop.dto.product.ProductItemDTO;

public interface ProductService {
    ProductItemDTO create(ProductCreateDTO model);
}

