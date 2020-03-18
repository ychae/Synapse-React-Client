// https://rest-docs.synapse.org/rest/org/sagebionetworks/repo/model/ObjectType.html

export enum ObjectType {
    ENTITY = 'ENTITY',
    ENTITY_CONTAINER = 'ENTITY_CONTAINER', 	
    PRINCIPAL = 'PRINCIPAL',	
    ACTIVITY = 'ACTIVITY',	
    EVALUATION = 'EVALUATION',	
    SUBMISSION = 'SUBMISSION',	
    EVALUATION_SUBMISSIONS = 'EVALUATION_SUBMISSIONS',	
    FILE = 'FILE',	
    MESSAGE = 'MESSAGE', 
    WIKI = 'WIKI',	
    FAVORITE = 'FAVORITE',	
    ACCESS_REQUIREMENT = 'ACCESS_REQUIREMENT',	
    ACCESS_APPROVAL = 'ACCESS_APPROVAL',	
    TEAM = 'TEAM',	
    TABLE = 'TABLE',	
    ACCESS_CONTROL_LIST = 'ACCESS_CONTROL_LIST',	
    PROJECT_SETTING = 'PROJECT_SETTING',	
    VERIFICATION_SUBMISSION = 'VERIFICATION_SUBMISSION',	
    CERTIFIED_USER_PASSING_RECORD = 'CERTIFIED_USER_PASSING_RECORD',	
    FORUM = 'FORUM',	
    THREAD = 'THREAD',	
    REPLY = 'REPLY',	
    FORM_GROUP = 'FORM_GROUP',	
    FORM_DATA = 'FORM_DATA',	
    ENTITY_VIEW = 'ENTITY_VIEW',	
    USER_PROFILE = 'USER_PROFILE',	
    DATA_ACCESS_REQUEST = 'DATA_ACCESS_REQUEST',	
    DATA_ACCESS_SUBMISSION = 'DATA_ACCESS_SUBMISSION',	
    DATA_ACCESS_SUBMISSION_STATUS = 'DATA_ACCESS_SUBMISSION_STATUS',	
    MEMBERSHIP_INVITATION = 'MEMBERSHIP_INVITATION',
}

// https://rest-docs.synapse.org/rest/org/sagebionetworks/repo/model/dao/WikiPageKey.html

export type WikiPageKey = {
    
    wikiPageId: string	//The ID of the wiki page.
    ownerObjectId: string	//The owner of this page.
    ownerObjectType: ObjectType	//JSON enum for the types of objects in Synapse.

  }
  