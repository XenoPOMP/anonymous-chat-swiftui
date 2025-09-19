//
//  WebSocket.swift
//  AnonymousChat
//
//  Created by Александр on 19.09.2025.
//

import SwiftUI

class WebSocket: ObservableObject {
    @Published var messages: [[String]] = []
}
