//
//  MessageModel.swift
//  AnonymousChat
//
//  Created by Александр on 19.09.2025.
//

import SwiftUI
import SwiftDate

struct ParsedMessageModel {
    var id: String
    var createdAt: Date
    var generatedName: String
    var seededColor: String
    var textContent: String
    
    init(_ model: MessageModel) {
        self.id = model.id
        self.createdAt = model.createdAt.toDate()!.date
        self.generatedName = model.generatedName
        self.seededColor = model.seededColor
        self.textContent = model.textContent
    }
}

struct MessageModel: Codable {
    var id: String
    var createdAt: String
    var generatedName: String
    var seededColor: String
    var textContent: String
    
    var parsed: ParsedMessageModel {
        ParsedMessageModel(self)
    }
}

class MessageStore: ObservableObject {
    @Published var messages: [MessageModel] = []
    
    init() {}
}
