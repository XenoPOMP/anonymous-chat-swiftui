//
//  MessageModel.swift
//  AnonymousChat
//
//  Created by Александр on 19.09.2025.
//

import SwiftUI

struct ParsedMessageModel {
    var id: String
    var createdAt: Date
    var generatedName: String
    var seededColor: String
    var textContent: String
}

struct MessageModel: Codable {
    var id: String
    var createdAt: String
    var generatedName: String
    var seededColor: String
    var textContent: String
}

class MessageStore: ObservableObject {
    @Published var messages: [MessageModel] = []
    
    init() {}
}
