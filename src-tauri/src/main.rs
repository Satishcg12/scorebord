// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_scoreboard(app: tauri::AppHandle) {
  let window = tauri::WindowBuilder::new(&app, "label", tauri::WindowUrl::App("/scoreboard".into()))
  .title("Scores")
    .build()
    .unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, open_scoreboard])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
