mod metros;
mod cities;
mod neighborhoods;

use actix_web::{App, HttpServer, web};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/metros", web::get().to(metros::list_metros))
            .route("/metros", web::post().to(metros::create_metro))
            .route("/metros/{metro}", web::get().to(metros::get_metro))
            .route("/metros/{metro}", web::put().to(metros::update_metro))
            .route("/metros/{metro}", web::delete().to(metros::delete_metro))
            .route("/metros/{metro}/upload", web::post().to(metros::upload_pics_for_metro))
            .route("/cities", web::get().to(cities::list_cities))
            .route("/cities", web::post().to(cities::create_city))
            .route("/cities/{city}", web::get().to(cities::get_city))
            .route("/cities/{city}", web::put().to(cities::update_city))
            .route("/cities/{city}", web::delete().to(cities::delete_city))
            .route("/neighborhoods", web::get().to(neighborhoods::list_neighborhoods))
            .route("/neighborhoods", web::post().to(neighborhoods::create_neighborhood))
            .route("/neighborhoods/{neighborhood}", web::get().to(neighborhoods::get_neighborhood))
            .route("/neighborhoods/{neighborhood}", web::put().to(neighborhoods::update_neighborhood))
            .route("/neighborhoods/{neighborhood}", web::delete().to(neighborhoods::delete_neighborhood))
    })
        .bind(("localhost", 7002))?
        .run()
        .await
}