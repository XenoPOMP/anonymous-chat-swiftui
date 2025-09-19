//
//  ChatView.swift
//  AnonymousChat
//
//  Created by Александр on 19.09.2025.
//

import SwiftUI
import Alamofire

struct ChatView: View {
    @EnvironmentObject<MessageStore> private var messageStore
    
    private var parsedMessages: [ParsedMessageModel] {
        messageStore.messages.map(ParsedMessageModel.init)
            .sortInOrder(of: .asc, by: \.createdAt)
    }
    
    var body: some View {
        VStack {
            ScrollView {
                LazyVStack(spacing: 0) {
                    ForEach(parsedMessages, id: \.id) { parsed in
                        let id = parsedMessages.firstIndex(where: { $0.id == parsed.id }) ?? 0
                        let prevId = id - 1
                        
                        MessageView(
                            isChained: parsedMessages.indices.contains(prevId) &&
                                parsedMessages[prevId].generatedName == parsed.generatedName,
                            data: parsed
                        )
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                }
                .padding()
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottomLeading)
            }
            .defaultScrollAnchor(.bottom)
            .task {
                AF.request("\(AppConstants.api.url)/messages").responseDecodable(of: [MessageModel].self) { response in
                    switch response.result {
                    case .success(let messages):
                        messageStore.messages = messages
                    case .failure(let error):
                        print(error)
                    }
                }
            }
            
            KeyboardView()
        }
    }
}

#Preview {
    Main()
        .environmentObject(MessageStore())
}
