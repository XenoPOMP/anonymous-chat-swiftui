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
    
    var body: some View {
        VStack {
            Text("Logged")
            Text("Loaded messages count: \(messageStore.messages.count)")
        }
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
    }
}

#Preview {
    Main()
        .environmentObject(MessageStore())
}
