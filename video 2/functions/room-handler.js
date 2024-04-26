
export async function createRoom(){
    rtmClient = await AgoraRTM.createInstance(APP_ID); 
    await rtmClient.login({uid, token});

    await rtmClient.addOrUpdateLocalUserAttributes({'name':displayName});

    channel = await rtmClient.createChannel(roomId);
    await channel.join();

    channel.on('MemberJoined', handleMemberJoined);
    channel.on('MemberLeft', handleMemberLeft);
    channel.on('ChannelMessage', handleChannelMessage);

    getMembers();
    
    client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'});
    await client.join(APP_ID, roomId, token, uid);   

    client.on('user-published', handleUserPublished);
    client.on('user-left', handleUserLeft);

    joinStream();    
}