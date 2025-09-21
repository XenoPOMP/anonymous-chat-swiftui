//
//  WSManager.swift
//  AnonymousChat
//
//  Created by Александр on 21.09.2025.
//

import SwiftUI

class WSManager: ObservableObject {
    init() {
    }
    
    private let websocketTask = URLSession(configuration: .default).webSocketTask(with: URL(string: AppConstants.api.wsUrl)!)
    
    /// Connects to ChatGateway.
    func connect() {
        websocketTask.resume()
    }
    
    /// Sends message to gateway. All credentials are got from HTTPCookies.
    func sendMessage(_ textContent: String) {
        let message = URLSessionWebSocketTask.Message.string(textContent)
        websocketTask.send(message) { error in
            if let error = error {
                print("Error sending message: \(error)")
            }
        }
    }
}
